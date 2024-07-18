/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import authSlice from './slices/authSlice';
import charSlice from './slices/charSlice';
import orgSlice from './slices/orgSlice';
import rolesSlice from './slices/rolesSlice';
import sceneSlice from './slices/sceneSlice';

const createNoopStorage = (): Storage => {
  return {
    getItem(_key: string) {
      return null;
    },
    setItem(_key: string, _value: string) {},
    removeItem(_key: string) {},
    clear() {},
    key(_index: number) {
      return null;
    },
    length: 0,
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  roles: rolesSlice.reducer,
  org: orgSlice.reducer,
  char: charSlice.reducer,
  scene: sceneSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 1,
    storage,
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

export const testStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type TestState = ReturnType<typeof testStore.getState>;
export type TestDispatch = typeof testStore.dispatch;
