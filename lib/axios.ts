import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import authSlice, { type AuthState, logout, setAuth } from './slices/authSlice';
import store from './store';

interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig | undefined;
  error: AxiosError;
}

const baseURL = `${process.env.STORY_URL}/graphql`;

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosAuthInstance = axios.create({
  baseURL: `${process.env.AUTH_URL}/api`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequestConfig = error.config;

    if (status !== 401) {
      return await Promise.reject(error);
    }

    if (isTokenRefreshing) {
      return await new Promise((resolve, reject) => {
        failedRequests.push({
          resolve,
          reject,
          config: originalRequestConfig,
          error,
        });
      });
    }

    isTokenRefreshing = true;

    try {
      const response = await axiosAuthInstance.post('/api/refresh');
      const token =
        response.headers?.authorization?.split(' ').pop()?.trim() ?? '';

      if (token === '') {
        store.dispatch(logout());
        return await Promise.reject(error);
      }

      store.dispatch(setAuth(token as AuthState));

      failedRequests.forEach(({ resolve, reject, config }) => {
        if (config !== undefined) {
          axiosInstance(config)
            .then((response) => {
              resolve(response);
            })
            .catch((error: AxiosError) => {
              reject(error);
            });
        }
      });
    } catch (_error: unknown) {
      console.error(_error);
      failedRequests.forEach(({ reject, error }) => reject(error));
      authSlice.actions.logout();
      return await Promise.reject(error);
    } finally {
      failedRequests = [];
      isTokenRefreshing = false;
    }

    return await axiosInstance(originalRequestConfig);
  }
);

export async function fetcher<T>(url: string): Promise<T> {
  return await axiosInstance.get<T>(url).then((res) => res.data);
}

export default axiosInstance;
export { axiosAuthInstance };
