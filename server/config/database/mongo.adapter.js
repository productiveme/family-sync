import { MongoClient } from 'mongodb';
import { DatabaseAdapter } from './adapter.js';

export class MongoAdapter extends DatabaseAdapter {
  constructor(url, options = {}) {
    super();
    this.url = url;
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      ...options
    };
    this.client = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(this.url, this.options);
      await this.client.connect();
      console.log('Successfully connected to MongoDB');
      return this.client.db();
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      throw err;
    }
  }

  async getCollection(name) {
    if (!this.client) {
      await this.connect();
    }
    return this.client.db().collection(name);
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      console.log('MongoDB connection closed');
    }
  }
}
