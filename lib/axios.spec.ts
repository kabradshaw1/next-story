import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import axiosInstance, { axiosAuthInstance, setupInterceptors } from './axios';
import isTokenExpired from './isTokenExired';
import { setAuth, logout } from './slices/authSlice';
import store from './store';

const mockAxiosInstance = new MockAdapter(axiosInstance);
const mockAxiosAuthInstance = new MockAdapter(axiosAuthInstance);

jest.mock('./isTokenExired', () => {
  return jest.fn();
});

describe('Axios Interceptor Tests', () => {
  beforeEach(() => {
    mockAxiosInstance.reset();
    mockAxiosAuthInstance.reset();
    store.dispatch(logout());
  });

  it('givenTokenInAuthState_whenRequest_thenAddTokenToHeader', async () => {
    store.dispatch(setAuth({ token: 'testToken' }));

    mockAxiosInstance.onGet('/test-endpoint').reply(200, { data: 'test' });

    const response = await axiosInstance.get('/test-endpoint');

    expect(response.config.headers.Authorization).toBe('Bearer testToken');
  });

  it('givenExpiredTokenAndRefreshTokenInHttpOnlyCookie_whenStoryRequest_thenRefreshTokenAndAddToHeader', async () => {
    // given
    const expiredToken = 'expiredToken';
    const newToken = 'newToken';
    store.dispatch(setAuth({ token: expiredToken }));

    mockAxiosInstance.onPost('/graphql').reply(200, { data: 'test' });
    (isTokenExpired as jest.Mock).mockReturnValue(true);
    mockAxiosAuthInstance
      .onPost('/refresh')
      .reply(200, {}, { authorization: `Bearer ${newToken}` });
    mockAxiosInstance.onPost('/test-endpoint').reply((config) => {
      // when

      const Authorization = config.headers?.Authorization;
      if (Authorization === `Bearer ${newToken}`) {
        return [200, { data: 'test' }];
      }
      return [401];
    });

    // when
    const response = await axiosInstance.post('/graphql');

    // then
    expect(response.config.headers.Authorization).toBe('Bearer newToken');
    expect(store.getState().auth.token).toBe(newToken);
  });

  it('givenNoTokenAndNoRefreshToken_whenStoryRequest_thenLogoutAndThrowError', async () => {
    // given no token
    mockAxiosInstance.onPost('/graphql').reply(401);
    mockAxiosAuthInstance.onPost('/refresh').reply(401);

    // Spy on the store's dispatch method to verify logout action is called
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // when
    await expect(axiosInstance.post('/graphql')).rejects.toThrow();

    // then
    expect(dispatchSpy).toHaveBeenCalledWith(logout());
    expect(store.getState().auth.token).toBe(null);
  });

  describe('setupInterceptors', () => {
    it('givenExiredToken_whenSetupInterceptor_thenRefreshTokenAndDispatchAuth', async () => {
      // given
      const expiredToken = 'expiredToken';
      const newToken = 'newToken';
      store.dispatch(setAuth({ token: expiredToken }));
      (isTokenExpired as jest.Mock).mockReturnValue(true);
      mockAxiosAuthInstance
        .onPost('/refresh')
        .reply(200, {}, { authorization: `Bearer ${newToken}` });
      mockAxiosInstance.onPost('/test-endpoint').reply((config) => {
        // when

        const Authorization = config.headers?.Authorization;
        if (Authorization === `Bearer ${newToken}`) {
          return [200, { data: 'test' }];
        }
        return [401];
      });
      await setupInterceptors();

      // then
      await waitFor(() => {
        expect(store.getState().auth.token).toBe(newToken);
      });
    });
    it('givenTokenRefreshFails_whenSetupInterceptor_thenLogout', async () => {
      // given
      const expiredToken = 'expiredToken';
      store.dispatch(setAuth({ token: expiredToken }));
      (isTokenExpired as jest.Mock).mockReturnValue(true);
      mockAxiosAuthInstance.onPost('/refresh').reply(401);

      // Spy on the store's dispatch method to verify logout action is called
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      await setupInterceptors();

      // when
      await expect(axiosInstance.post('/test-endpoint')).rejects.toThrow();

      // then
      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(logout());
      });
      expect(store.getState().auth.token).toBe(null);
    });

    it('givenNoInitialTokenButRefreshSucceeds_whenSetupInterceptor_thenSetNewToken', async () => {
      // given
      const newToken = 'newToken';
      (isTokenExpired as jest.Mock).mockReturnValue(true);
      mockAxiosAuthInstance
        .onPost('/refresh')
        .reply(200, {}, { authorization: `Bearer ${newToken}` });
      mockAxiosInstance.onPost('/test-endpoint').reply((config) => {
        const Authorization = config.headers?.Authorization;
        if (Authorization === `Bearer ${newToken}`) {
          return [200, { data: 'test' }];
        }
        return [401];
      });

      await setupInterceptors();

      // when
      const response = await axiosInstance.post('/test-endpoint');

      // then
      await waitFor(() => {
        expect(store.getState().auth.token).toBe(newToken);
      });
      expect(response.config.headers.Authorization).toBe(`Bearer ${newToken}`);
    });

    it('should handle multiple interceptors correctly', async () => {
      // given
      const expiredToken = 'expiredToken';
      const newToken = 'newToken';
      store.dispatch(setAuth({ token: expiredToken }));
      (isTokenExpired as jest.Mock).mockReturnValue(true);
      mockAxiosAuthInstance
        .onPost('/refresh')
        .reply(200, {}, { authorization: `Bearer ${newToken}` });
      mockAxiosInstance.onGet('/test-endpoint').reply((config) => {
        const Authorization = config.headers?.Authorization;
        if (Authorization === `Bearer ${newToken}`) {
          return [200, { data: 'test' }];
        }
        return [401];
      });

      await setupInterceptors();

      // when
      const response = await axiosInstance.get('/test-endpoint');

      // then
      await waitFor(() => {
        expect(store.getState().auth.token).toBe(newToken);
      });
      expect(response.config.headers.Authorization).toBe(`Bearer ${newToken}`);
    });

    it('should handle long-running token refresh', async () => {
      // given
      const expiredToken = 'expiredToken';
      const newToken = 'newToken';
      store.dispatch(setAuth({ token: expiredToken }));
      (isTokenExpired as jest.Mock).mockReturnValue(true);
      mockAxiosAuthInstance.onPost('/refresh').reply(
        async () =>
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve([200, {}, { authorization: `Bearer ${newToken}` }]);
            }, 1000)
          )
      );
      mockAxiosInstance.onPost('/test-endpoint').reply((config) => {
        const Authorization = config.headers?.Authorization;
        if (Authorization === `Bearer ${newToken}`) {
          return [200, { data: 'test' }];
        }
        return [401];
      });

      await setupInterceptors();

      // when
      const response = await axiosInstance.post('/test-endpoint');

      // then
      await waitFor(() => {
        expect(store.getState().auth.token).toBe(newToken);
      });
      expect(response.config.headers.Authorization).toBe(`Bearer ${newToken}`);
    });

    it('givenExpiredTokenWithNoRefreshEndpoint_whenSetupInterceptor_thenThrowError', async () => {
      // given
      const expiredToken = 'expiredToken';
      store.dispatch(setAuth({ token: expiredToken }));
      (isTokenExpired as jest.Mock).mockReturnValue(true);
      // No refresh endpoint is mocked here

      // Spy on the store's dispatch method to verify logout action is called
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      await setupInterceptors();

      // when
      await expect(axiosInstance.post('/test-endpoint')).rejects.toThrow();

      // then
      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(logout());
      });
      expect(store.getState().auth.token).toBe(null);
    });
  });
});