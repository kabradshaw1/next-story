// 'use client';
// import 'client-only';

// import { useState } from 'react';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// import StoreProvider from './StoreProvider';

// export default function QueryProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }): JSX.Element {
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             staleTime: 1000 * 6,
//             refetchInterval: 1000 * 6,
//           },
//         },
//       })
//   );

//   return (
//     <StoreProvider>
//       <QueryClientProvider client={queryClient}>
//         {children}
//         <ReactQueryDevtools />
//       </QueryClientProvider>
//     </StoreProvider>
//   );
// }
