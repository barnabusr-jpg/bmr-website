import { MongoClient } from 'mongodb';

declare global {
  // This tells the editor that 'global._mongoClientPromise' is a valid path.
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};
