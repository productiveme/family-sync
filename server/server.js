import config from './config/index.js';
import { db } from './db.js';
import { typeDefs } from './schema.js';
import createPubSubService from './infrastructure/pubsub.js';
import createPostService from './services/post.service.js';
import createCommentService from './services/comment.service.js';
import createPostController from './controllers/post.controller.js';
import createCommentController from './controllers/comment.controller.js';
import createResolvers from './resolvers.js';
import createGraphQLServer from './infrastructure/server.js';

// Initialize services
const pubSub = createPubSubService();
const postService = createPostService(db);
const commentService = createCommentService(db, pubSub);

// Initialize controllers
const postController = createPostController(postService, commentService);
const commentController = createCommentController(commentService);

// Create resolvers
const resolvers = createResolvers({ postController, commentController });

// Initialize server
const server = createGraphQLServer({
  typeDefs,
  resolvers,
  config,
  context: { pubSub }
});

// Start server
server.start();
