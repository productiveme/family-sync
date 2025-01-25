import config from './config/index.js'
import { initializeDatabase } from './config/database.js'
import { typeDefs } from './schema.js'
import createPubSubService from './infrastructure/pubsub.js'
import createGraphQLServer from './infrastructure/server.js'

async function startServer() {
  try {
    // Initialize MongoDB connection
    await initializeDatabase()

    // Initialize services
    const pubSub = createPubSubService()

    // Initialize controllers

    // Create resolvers

    // Initialize server
    const server = createGraphQLServer({
      typeDefs,
      resolvers,
      config,
      context: { pubSub },
    })

    // Start server
    server.start()

    console.log('Server started successfully')
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
