import { ApolloProvider } from "@apollo/client";
import type { Metadata } from "next";

import "./globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import client from "../utils/client"; // eslint-disable-line import/no-unresolved
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import store, { persistor } from "@/store";

export const metadata: Metadata = {
  title: {
    default: "Galaxy Voyagers",
    template: "",
  },
  description:
    "A fleet of spaceships embark on a journey to reach another habitalable planet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ApolloProvider client={client}>
            <body>
              <Header />
                <main>
                  {children}
                </main>
              <Footer />
            </body>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </html>
  );
}
