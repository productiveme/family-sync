// Database adapter interface
export class DatabaseAdapter {
  async connect() {
    throw new Error('connect() must be implemented');
  }

  async getCollection(name) {
    throw new Error('getCollection() must be implemented');
  }

  async close() {
    throw new Error('close() must be implemented');
  }
}
