import { MongoClient } from 'mongodb';

const dbConfig = {
  url: process.env.VITE_MONGO_URL || 'mongodb://localhost:27017/familysync',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
};

let client = null;

export const initializeDatabase = async () => {
  try {
    if (!client) {
      client = new MongoClient(dbConfig.url, dbConfig.options);
      await client.connect();
      console.log('Successfully connected to MongoDB.');
    }
    return client.db();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
};

export const getCollection = async (collectionName) => {
  if (!client) {
    await initializeDatabase();
  }
  return client.db().collection(collectionName);
};

export const closeDatabase = async () => {
  if (client) {
    await client.close();
    client = null;
    console.log('MongoDB connection closed.');
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDatabase();
  process.exit(0);
});
