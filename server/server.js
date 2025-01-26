import config from './config/index.js'
import { initializeDatabase } from './config/database.js'
import { schema } from './schema.js'
import createPubSubService from './infrastructure/pubsub.js'
import createGraphQLServer from './infrastructure/server.js'
import { verifyToken } from './middleware/auth.js'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import authRoutes from './routes/auth.js'

async function startServer() {
  try {
    // Initialize MongoDB/TingoDB connection
    await initializeDatabase()

    // Initialize services
    const pubsub = createPubSubService()

    // Create fastify app
    const fastify = Fastify({ logger: true })
    await fastify.register(cors, config.cors)
    fastify.addHook('preHandler', async (req, reply) => {
      const token = req.headers.authorization?.split(' ')[1]
      req.user = token ? await verifyToken(token) : null
    })

    // Add API routes
    await fastify.register(authRoutes, { prefix: '/api/auth' })

    // Initialize server with context
    const server = createGraphQLServer({
      ...schema,
      config,
      context: async ({ req }) => {
        return {
          user: req.user,
          pubsub,
        }
      },
    })

    // Start server
    server.start()

    // Start fastify server
    await fastify.listen({ port: config.port - 1, host: '0.0.0.0' })

    console.log('Server started successfully')
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
