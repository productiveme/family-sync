import { createPubSub } from 'graphql-yoga';

const createPubSubService = () => {
  const pubSub = createPubSub();

  const publish = (channel, payload) => 
    pubSub.publish(channel, payload);

  const subscribe = (channel) =>
    pubSub.subscribe(channel);

  return Object.freeze({
    publish,
    subscribe
  });
};

export default createPubSubService;
