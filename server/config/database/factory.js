import { MongoAdapter } from './mongo.adapter.js';
import { TingoAdapter } from './tingo.adapter.js';

export class DatabaseFactory {
  static async createAdapter() {
    const mongoUrl = process.env.VITE_MONGO_URL;

    if (mongoUrl) {
      try {
        const adapter = new MongoAdapter(mongoUrl);
        await adapter.connect();
        return adapter;
      } catch (err) {
        console.warn('MongoDB connection failed, falling back to TingoDB:', err.message);
      }
    }

    // Fallback to TingoDB
    const adapter = new TingoAdapter();
    await adapter.connect();
    return adapter;
  }
}
