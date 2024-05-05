import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

export const makeStore = () => {
  return configureStore({
    reducer: {},
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// import { combineReducers } from "redux";
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   persistReducer,
//   persistStore,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// import authSlice from "./slices/authSlice";

// const rootReducer = combineReducers({
//   auth: authSlice.reducer,
// });

// const persistedReducer = persistReducer(
//   {
//     key: "root",
//     version: 1,
//     storage: storage,
//   },
//   rootReducer,
// );

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof rootReducer>;

// export default store;
