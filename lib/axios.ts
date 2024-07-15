import axios, { isAxiosError } from 'axios';

import isTokenExpired from './isTokenExired';
import { setAuth, logout } from './store/slices/authSlice';
import store from './store/store';

export const axiosAuthInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosClientInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STORY_URL}/graphql`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const handleTokenRefresh = async (): Promise<void> => {
  try {
    const response = await axiosAuthInstance.post('/refresh');
    if (response.status === 200) {
      store.dispatch(setAuth({ token: response.data.token }));
    }
  } catch (error) {
    store.dispatch(logout());
    throw error;
  }
};

export const setupInterceptors = async (): Promise<void> => {
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
