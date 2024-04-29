import type { Metadata } from "next";

// import { Inter } from "next/font/google";
// import { ApolloProvider } from '@apollo/client';
// import client from "../utils/client";
import "./globals.css";
import Footer from "@/component/Footer/Footer";
import Header from "@/component/Header/Header";

// const inter = Inter({ subsets: ["latin"] });

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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
