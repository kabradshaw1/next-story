import axios from 'axios';
// import createAuthRefreshInterceptor from "axios-auth-refresh";

// import authSlice from "./slices/authSlice";
import store from './store';

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

// axiosInstance.interceptors.response.use(
//   (res) => {
//     console.debug(
//       "[Response]",
//       res.config.baseURL + res.config.url,
//       res.status,
//       res.data
//     );
//     return Promise.resolve(res);
//   },
//   (err) => {
//     console.debug(
//       "[Response]",
//       err.config.baseURL + err.config.url,
//       err.response.status,
//       err.response.data
//     );
//     return Promise.reject(err);
//   }
// );

// const refreshAuthLogic = async (failedRequest) => {
//   const { token } = store.getState().auth;
//   if (token !== null) {
//     return axios
//       .post(
//         "/user/auth/refresh/",
//         {
//           refresh: token,
//         },
//         {
//           baseURL: baseURL,
//         }
//       )
//       .then((resp) => {
//         const { access, refresh } = resp.data;
//         failedRequest.response.config.headers.Authorization =
//           "Bearer " + access;
//         store.dispatch(
//           authSlice.actions.setAuth({
//             token: access,
//           })
//         );
//       })
//       .catch((err) => {
//         if (err.response && err.response.status === 401) {
//           store.dispatch(authSlice.actions.logout());
//         }
//       });
//   }
// };

// createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export async function fetcher<T>(url: string): Promise<T> {
  return await axiosInstance.get<T>(url).then((res) => res.data);
}
export default axiosInstance;
