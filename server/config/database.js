import { DatabaseFactory } from './database/factory.js';

let dbAdapter = null;

export const initializeDatabase = async () => {
  try {
    if (!dbAdapter) {
      dbAdapter = await DatabaseFactory.createAdapter();
    }
    return dbAdapter;
  } catch (err) {
    console.error('Failed to initialize database:', err);
    throw err;
  }
};

export const getCollection = async (collectionName) => {
  if (!dbAdapter) {
    await initializeDatabase();
  }
  return dbAdapter.getCollection(collectionName);
};

export const closeDatabase = async () => {
  if (dbAdapter) {
    await dbAdapter.close();
    dbAdapter = null;
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
