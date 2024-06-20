'use client';
import 'client-only';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

import store from './store/store';

persistStore(store);
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
