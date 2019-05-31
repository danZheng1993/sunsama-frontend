/* eslint-disable */
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { BACKEND_URL } from '../config';

const networkInterface = createNetworkInterface({
  uri: `${BACKEND_URL}/graphql/`,
});

networkInterface
  .useAfter([
    {
      applyAfterware({ response }, next) {
        if (response.status === 401) {
          console.log('401 error')
        }
        next()
      },
    },
  ]);

let connectionsCount = 0

export const apolloClient = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => {
    if (o.id) {
      return `${o.__typename}-${o.id}`
    } else if (o.node) {
      return `${o.__typename}-${o.node.id}`
    } else if (o.cursor) {
      return `${o.__typename}-${o.cursor}`
    } else {
      connectionsCount++
      return `${o.__typename}-${connectionsCount}`
    }

    return o.__typename
  },
})
