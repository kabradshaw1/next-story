'use client';
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import  client from "./client";
import store, { persistor } from "@/store";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
        <PersistGate loading persistor={persistor}>
          <ApolloProvider client={client}>
            {children}
          </ApolloProvider>
        </PersistGate>
      </Provider>
  );
}
