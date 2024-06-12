'use client';
import 'client-only';

import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import client from '@/lib/apollo';

import store, { persistor } from '../lib/store/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
