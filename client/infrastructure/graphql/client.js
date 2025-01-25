import { createClient } from '@urql/preact';
import { createClient as createWSClient } from 'graphql-ws';
import { subscriptionExchange } from '@urql/core';
import { cacheExchange, fetchExchange } from '@urql/core';
import { config } from '../../config';

const wsClient = createWSClient({
  url: config.graphqlWsUrl,
  retryAttempts: 5,
  connectionParams: {
    // Add any auth tokens here if needed
  },
});

export const client = createClient({
  url: config.graphqlHttpUrl,
  requestPolicy: 'cache-and-network',
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => ({
        subscribe: sink => ({
          unsubscribe: wsClient.subscribe(operation, sink)
        })
      })
    })
  ]
});
