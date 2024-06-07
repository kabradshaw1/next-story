import 'client-only';
import axios, { isAxiosError } from 'axios';

import isTokenExpired from './isTokenExired';
import { logout, setAuth } from './slices/authSlice';
import store from './store';

const axiosInstance = axios.create({
  baseURL: `${process.env.STORY_URL}/graphql`,
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
  let token = store.getState().auth.token;

  const setAuthorizationHeader = (token: string | null): void => {
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  };

  if (token !== null && !isTokenExpired(token)) {
    setAuthorizationHeader(token);
  } else {
    await handleTokenRefresh();
    token = store.getState().auth.token;
    setAuthorizationHeader(token);
  }

  return config;
});

const handleTokenRefresh = async (): Promise<void> => {
  try {
    const response = await axiosAuthInstance.post('/refresh');

    const newToken = response.headers?.authorization?.split(' ')[1] ?? '';

    if (newToken !== '' && newToken !== undefined) {
      store.dispatch(setAuth({ token: newToken }));
    }
  } catch (error) {
    store.dispatch(logout());
    throw error;
  }
};

const setupInterceptors = async (): Promise<void> => {
  const initialTokenCheck = async (): Promise<void> => {
    const token = store.getState().auth.token;

    if (token !== null && isTokenExpired(token)) {
      await handleTokenRefresh();
    }
  };

  const refreshTokenInterval = async (): Promise<void> => {
    try {
      await handleTokenRefresh();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        console.error('Received 401 error, stopping token refresh.');
        return;
      }
    }
    scheduleNextTokenRefresh();
  };

  const scheduleNextTokenRefresh = (): void => {
    setTimeout(
      () => {
        refreshTokenInterval().catch((error) => {
          console.error('Error in scheduled token refresh:', error);
        });
      },
      14 * 60 * 1000
    );
  };

  // Perform the initial token check
  initialTokenCheck().catch((error) => {
    console.error('Error in initial token check:', error);
  });

  // Start the recursive token refresh
  scheduleNextTokenRefresh();
};

export async function fetcher<T>(url: string): Promise<T> {
  return await axiosInstance.get<T>(url).then((res) => res.data);
}

export default axiosInstance;
export { axiosAuthInstance, setupInterceptors };
