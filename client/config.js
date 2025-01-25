const getGraphQLUrl = () => {
  const port = import.meta.env.VITE_PORT_GQL || '3002';
  const host = window.location.hostname;
  const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const httpProtocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  
  return {
    graphqlHttpUrl: `${httpProtocol}//${host}:${port}/graphql`,
    graphqlWsUrl: `${wsProtocol}//${host}:${port}/graphql`
  };
};

export const config = getGraphQLUrl();
