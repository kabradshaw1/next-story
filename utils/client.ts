import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import store from "../store";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_APP_EX_API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // Get the token from the Redux store
  const token = store.getState().auth.token;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
