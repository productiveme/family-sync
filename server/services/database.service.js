import { ObjectId } from 'mongodb';
import { getCollection } from '../config/database.js';

export class DatabaseService {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async initialize() {
    this.collection = await getCollection(this.collectionName);
  }

  async findOne(query) {
    await this.initialize();
    return this.collection.findOne(query);
  }

  async find(query = {}, options = {}) {
    await this.initialize();
    return this.collection.find(query, options).toArray();
  }

  async insertOne(document) {
    await this.initialize();
    const result = await this.collection.insertOne(document);
    return { ...document, _id: result.insertedId };
  }

  async updateOne(query, update) {
    await this.initialize();
    return this.collection.updateOne(query, { $set: update });
  }

  async deleteOne(query) {
    await this.initialize();
    return this.collection.deleteOne(query);
  }

  async findById(id) {
    await this.initialize();
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async updateById(id, update) {
    await this.initialize();
    return this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
  }

  async deleteById(id) {
    await this.initialize();
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

// Example usage for specific collections
export class UsersService extends DatabaseService {
  constructor() {
    super('users');
  }

  async findByEmail(email) {
    return this.findOne({ email: email.toLowerCase() });
  }
}

export class ActivitiesService extends DatabaseService {
  constructor() {
    super('activities');
  }

  async findByUserId(userId) {
    return this.find({ userId: new ObjectId(userId) });
  }
}

export class ProfilesService extends DatabaseService {
  constructor() {
    super('profiles');
  }

  async findByUserId(userId) {
    return this.find({ userId: new ObjectId(userId) });
  }
}
