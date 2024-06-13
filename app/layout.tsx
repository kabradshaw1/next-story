import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import './globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

// eslint-disable-next-line @typescript-eslint/promise-function-async
const StoreProvider = dynamic(() => import('@/app/StoreProvider'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: {
    default: 'Galaxy Voyagers',
    template: '',
  },
  description:
    'A fleet of spaceships embark on a journey to reach another habitalable planet.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <main className="flex flex-wrap justify-center items-center bg-dark-gray">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
