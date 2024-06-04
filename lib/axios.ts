import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { jwtDecode } from 'jwt-decode';

import { type AuthState, logout, setAuth } from './slices/authSlice';
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

const isTokenExpired = (token: string): boolean => {
  const decoded: { exp: number } = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
};

const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(async (config) => {
    let { token } = store.getState().auth;

    if (token && isTokenExpired(token)) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        try {
          const response = await axiosAuthInstance.post('/refresh');
          token = response.headers.authorization?.split(' ')[1] ?? '';
          store.dispatch(setAuth({ token }));
          isTokenRefreshing = false;
        } catch (error) {
          store.dispatch(logout());
          isTokenRefreshing = false;
          throw error;
        }
      }
      return await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (!isTokenRefreshing) {
            clearInterval(interval);
            if (store.getState().auth.token) {
              config.headers.Authorization = `Bearer ${store.getState().auth.token}`;
              resolve(config);
            } else {
              reject(new Error('Failed to refresh token'));
            }
          }
        }, 100);
      });
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

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
      const response = await axiosAuthInstance.post('/refresh');
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
      if (originalRequestConfig === undefined) {
        throw new Error('config is undefined');
      }
      return await axiosInstance(originalRequestConfig);
    } catch (_error: unknown) {
      console.error(_error);
      failedRequests.forEach(({ reject, error }) => {
        reject(error);
      });
      store.dispatch(logout());
      return await Promise.reject(error);
    } finally {
      failedRequests = [];
      isTokenRefreshing = false;
    }
  }
);

export async function fetcher<T>(url: string): Promise<T> {
  return await axiosInstance.get<T>(url).then((res) => res.data);
}

export default axiosInstance;
export { axiosAuthInstance };
