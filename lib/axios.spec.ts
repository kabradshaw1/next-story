// import MockAdapter from 'axios-mock-adapter';

// import axiosMutationInstance, { axiosAuthInstance } from './axios';
// import isTokenExpired from './isTokenExired';
// import { setAuth, logout } from './store/slices/authSlice';
// import store from './store/store';

// const mockAxiosMutationInstance = new MockAdapter(axiosMutationInstance);
// const mockAxiosAuthInstance = new MockAdapter(axiosAuthInstance);

// jest.mock('./isTokenExired', () => {
//   return jest.fn();
// });

// describe('Axios Interceptor Tests', () => {
//   beforeEach(() => {
//     mockAxiosMutationInstance.reset();
//     mockAxiosAuthInstance.reset();
//     store.dispatch(logout());
//   });

//   it('givenTokenInAuthState_whenRequest_thenAddTokenToHeader', async () => {
//     store.dispatch(setAuth({ token: 'testToken' }));

//     mockAxiosMutationInstance
//       .onGet('/test-endpoint')
//       .reply(200, { data: 'test' });

//     const response = await axiosMutationInstance.get('/test-endpoint');

//     expect(response.config.headers.Authorization).toBe('Bearer testToken');
//   });

//   it('givenExpiredTokenAndRefreshTokenInHttpOnlyCookie_whenStoryRequest_thenRefreshTokenAndAddToHeader', async () => {
//     // given
//     const expiredToken = 'expiredToken';
//     const newToken = 'newToken';
//     store.dispatch(setAuth({ token: expiredToken }));

//     mockAxiosMutationInstance.onPost('/graphql').reply(200, { data: 'test' });
//     (isTokenExpired as jest.Mock).mockReturnValue(true);
//     mockAxiosAuthInstance
//       .onPost('/refresh')
//       .reply(200, {}, { authorization: `Bearer ${newToken}` });
//     mockAxiosMutationInstance.onPost('/test-endpoint').reply((config) => {
//       // when

//       const Authorization = config.headers?.Authorization;
//       if (Authorization === `Bearer ${newToken}`) {
//         return [200, { data: 'test' }];
//       }
//       return [401];
//     });

//     // when
//     const response = await axiosMutationInstance.post('/graphql');

//     // then
//     expect(response.config.headers.Authorization).toBe('Bearer newToken');
//     expect(store.getState().auth.token).toBe(newToken);
//   });

//   it('givenNoTokenAndNoRefreshToken_whenStoryRequest_thenLogoutAndThrowError', async () => {
//     // given no token
//     mockAxiosMutationInstance.onPost('/graphql').reply(401);
//     mockAxiosAuthInstance.onPost('/refresh').reply(401);

//     // Spy on the store's dispatch method to verify logout action is called
//     const dispatchSpy = jest.spyOn(store, 'dispatch');

//     // when
//     await expect(axiosMutationInstance.post('/graphql')).rejects.toThrow();

//     // then
//     expect(dispatchSpy).toHaveBeenCalledWith(logout());
//     expect(store.getState().auth.token).toBe(null);
//   });
// });
