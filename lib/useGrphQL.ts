// import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
// import { useQuery, type UseQueryResult } from '@tanstack/react-query';
// import request from 'graphql-request';

// export function useGraphQL<TResult, TVariables>(
//   document: TypedDocumentNode<TResult, TVariables>,
//   ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
// ): UseQueryResult<TResult> {
//   return useQuery(
//     [(document.definitions[0] as any).name.value, variables],
//     async ({ queryKey }) =>
//       request(
//         'https://swapi-graphql.netlify.app/.netlify/functions/index',
//         document,
//         queryKey[1] ? queryKey[1] : undefined
//       )
//   );
// }
