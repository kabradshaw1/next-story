import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

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
        <main className="flex flex-wrap justify-center items-center bg-dark-gray">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
