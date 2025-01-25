import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

const createGraphQLServer = ({ 
  typeDefs, 
  resolvers, 
  config,
  context 
}) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const yoga = createYoga({
    schema,
    graphiql: {
      subscriptionsProtocol: 'WS'
    },
    cors: config.cors,
    landingPage: false,
    multipart: true,
    context
  });

  const server = createServer(yoga);

  const wsServer = new WebSocketServer({
    server,
    path: yoga.graphqlEndpoint
  });

  useServer(
    {
      schema,
      context
    },
    wsServer
  );

  const start = () => {
    server.listen(config.port, () => {
      console.log(`🚀 GraphQL Server ready at http://localhost:${config.port}/graphql`);
    });
  };

  return Object.freeze({
    start
  });
};

export default createGraphQLServer;
