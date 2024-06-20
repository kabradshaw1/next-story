'use client';
import 'client-only';

import { ApolloProvider as Apollo } from '@apollo/client';

import client from '@/lib/apollo';

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <Apollo client={client}>{children}</Apollo>;
}
