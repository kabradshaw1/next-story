import { type AxiosRequestConfig } from 'axios';

import axiosInstance, { setupInterceptors } from './axios';
import { setAuth, logout } from './slices/authSlice';
import store from './store';

jest.mock('axios'); // Mock axios library
jest.mock('jwt-decode'); // Mock jwt-decode library

describe('Axios Interceptor Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupInterceptors();
    store.dispatch(logout()); // Clear any existing state
  });

  it('givenTokenInAuthStateAndSetupInterceptors_whenRequest_thenAddTokenToHeader', async () => {
    const token = 'testToken';
    const mockConfig: AxiosRequestConfig = { headers: {} };

    // Set the auth state
    store.dispatch(setAuth({ token }));

    // Mock the request method to capture the config object
    const axiosRequestSpy = jest.spyOn(axiosInstance, 'request');

    // Simulate making a request with the Axios instance
    await axiosInstance.request(mockConfig);

    // Get the config object passed to the request method
    const requestConfig = axiosRequestSpy.mock.calls[0][0];
    if (requestConfig.headers === undefined) return;
    expect(requestConfig.headers.Authorization).toBe(`Bearer ${token}`);
  });
});
