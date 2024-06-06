import 'client-only';
import axios from 'axios';

import isTokenExpired from './isTokenExired';
import { logout, setAuth } from './slices/authSlice';
import store from './store';

const baseURL = `${process.env.STORY_URL}/graphql`;

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosAuthInstance = axios.create({
  baseURL: `${process.env.AUTH_URL}/api/auth`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const { token } = store.getState().auth;

  if (token !== null) {
    if (!isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      await handleTokenRefresh();
      const { token } = store.getState().auth;
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const handleTokenRefresh = async (): Promise<void> => {
  try {
    console.log('Refreshing token');
    const response = await axiosAuthInstance.post('/refresh');
    console.log('Token refreshed', response.data);
    const newToken = response.headers?.authorization?.split(' ')[1] ?? '';
    if (newToken !== '' && newToken !== undefined) {
      store.dispatch(setAuth({ token: newToken }));
    }
  } catch (error) {
    console.error('Error refreshing token', error);
    store.dispatch(logout());
    throw error;
  }
};

const setupInterceptors = (): void => {
  axiosInstance.interceptors.request.use(async (config) => {
    let { token } = store.getState().auth;
    return config;
  });
};

export async function fetcher<T>(url: string): Promise<T> {
  return await axiosInstance.get<T>(url).then((res) => res.data);
}

export default axiosInstance;
export { axiosAuthInstance, setupInterceptors };
