import { QueryClient } from '@tanstack/react-query';

import getRoles from '@/requests/queryRoles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
export const prefetchRoles = async (): Promise<void> => {
  await queryClient.prefetchQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  });
};
