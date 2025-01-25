import { generateToken, verifyToken } from '../middleware/auth.js';
import { getCollection } from '../config/database.js';

const authRoutes = async (fastify, options) => {
  fastify.post('/login', async (req, reply) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return reply.status(400).send({ message: 'Email and password are required' });
    }

    try {
      const users = await getCollection('users');
      const user = await users.findOne({ email: email.toLowerCase() });

      if (!user || user.password !== password) {
        return reply.status(401).send({ message: 'Invalid credentials' });
      }

      const token = generateToken(user);
      reply.send({ token, user });
    } catch (error) {
      console.error('Login error:', error);
      reply.status(500).send({ message: 'Login failed' });
    }
  });

  fastify.post('/register', async (req, reply) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return reply.status(400).send({ message: 'All fields are required' });
    }

    try {
      const users = await getCollection('users');
      const existingUser = await users.findOne({ email: email.toLowerCase() });

      if (existingUser) {
        return reply.status(409).send({ message: 'Email already registered' });
      }

      const user = {
        name,
        email: email.toLowerCase(),
        password,
        role,
        createdAt: new Date()
      };

      const result = await users.insertOne(user);
      user.id = result.insertedId;

      const token = generateToken(user);
      reply.send({ token, user });
    } catch (error) {
      console.error('Registration error:', error);
      reply.status(500).send({ message: 'Registration failed' });
    }
  });

  fastify.get('/me', async (req, reply) => {
    if (!req.user) {
      return reply.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const users = await getCollection('users');
      const user = await users.findOne({ _id: req.user.id });
      reply.send({ user });
    } catch (error) {
      console.error('Get user error:', error);
      reply.status(500).send({ message: 'Failed to get user' });
    }
  });
};

export default authRoutes;
