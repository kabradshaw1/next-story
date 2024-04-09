import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloProvider } from '@apollo/client';
import client from "../utils/client";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galaxy Voyagers",
  description: "A fleet of spaceships embark on a journey to reach another habitalable planet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  );
}
