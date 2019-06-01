/* eslint-disable */
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { BACKEND_URL } from '../config';

export const initApolloClient = (token = '') => {
  const httpLink = createHttpLink({
    uri: `${BACKEND_URL}/graphql`
  });
  const  authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      }
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}