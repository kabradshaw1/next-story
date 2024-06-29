import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';

import './globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

// eslint-disable-next-line @typescript-eslint/promise-function-async
const StoreProvider = dynamic(() => import('@/lib/StoreProvider'), {
  ssr: false,
});
// eslint-disable-next-line @typescript-eslint/promise-function-async
const ApolloProvider = dynamic(() => import('@/lib/ApolloProvider'), {
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
          <ApolloProvider>
            <Header />
            <main className="flex flex-wrap justify-center items-center bg-slate-700">
              {children}
            </main>
            <Footer />
          </ApolloProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
