import config from './config/index.js';
import { initializeDatabase } from './config/database.js';
import { typeDefs } from './schema.js';
import createPubSubService from './infrastructure/pubsub.js';
import createPostService from './services/post.service.js';
import createCommentService from './services/comment.service.js';
import createPostController from './controllers/post.controller.js';
import createCommentController from './controllers/comment.controller.js';
import createResolvers from './resolvers.js';
import createGraphQLServer from './infrastructure/server.js';

async function startServer() {
  try {
    // Initialize MongoDB connection
    await initializeDatabase();

    // Initialize services
    const pubSub = createPubSubService();
    const postService = createPostService();
    const commentService = createCommentService();

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
    
    console.log('Server started successfully');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
