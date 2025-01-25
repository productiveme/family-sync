import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL || 'mongodb://localhost:27017/familycalendar');

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export const getCollection = (name) => {
  return client.db().collection(name);
};

export const closeDB = async () => {
  await client.close();
};
