import tingodb from 'tingodb';
import { promisify } from 'util';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { DatabaseAdapter } from './adapter.js';

const { Db, Collection } = tingodb()

export class TingoAdapter extends DatabaseAdapter {
  constructor(dbPath = './data') {
    super();
    this.dbPath = dbPath;
    this.db = null;
    this.collections = new Map();
  }

  async connect() {
    try {
      // Ensure data directory exists
      await mkdir(this.dbPath, { recursive: true });
      
      // Initialize TingoDB
      const tingodb = new Db(this.dbPath, {});
      this.db = tingodb;
      
      console.log('Successfully connected to TingoDB');
      return this.db;
    } catch (err) {
      console.error('Failed to connect to TingoDB:', err);
      throw err;
    }
  }

  async getCollection(name) {
    if (!this.db) {
      await this.connect();
    }

    if (!this.collections.has(name)) {
      const collection = this.db.collection(name);
      
      // Promisify collection methods
      const methods = ['find', 'findOne', 'insert', 'update', 'remove'];
      methods.forEach(method => {
        const originalMethod = collection[method].bind(collection);
        collection[method] = promisify(originalMethod);
      });

      this.collections.set(name, collection);
    }

    return this.collections.get(name);
  }

  async close() {
    if (this.db) {
      this.db = null;
      this.collections.clear();
      console.log('TingoDB connection closed');
    }
  }
}
