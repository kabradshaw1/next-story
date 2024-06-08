import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import './globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const ReduxProvider = dynamic(() => import('@/lib/store/redux-provider'), {
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
        <ReduxProvider>
          <Header />
          <main className="flex flex-wrap justify-center items-center bg-dark-gray">
            {children}
          </main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
