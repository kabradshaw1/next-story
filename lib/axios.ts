import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import authSlice from './slices/authSlice';
import store from './store';

interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}

const baseURL = `${process.env.URL}`;

const axiosInstance = axios.create({
  baseURL,
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
      const response = await axiosInstance.post('/access-token', {
        refreshToken: JSON.parse(localStorage.getItem('refreshToken') ?? ''),
      });
      const { accessToken = null, refreshToken = null } = response.data ?? {};

      if (accessToken == null || refreshToken == null) {
        throw new Error(
          'Something went wrong while refreshing your access token'
        );
      }

      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));

      failedRequests.forEach(({ resolve, reject, config }) => {
        axiosInstance(config)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    } catch (_error: unknown) {
      console.error(_error);
      failedRequests.forEach(({ reject, error }) => reject(error));
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
      return Promise.reject(error);
    } finally {
      failedRequests = [];
      isTokenRefreshing = false;
    }

    return axiosInstance(originalRequestConfig);
  }
);
export async function fetcher<T>(url: string): Promise<T> {
  return await axiosInstance.get<T>(url).then((res) => res.data);
}
export default axiosInstance;
