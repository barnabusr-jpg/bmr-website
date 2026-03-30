import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('! CONFIG_ERROR: MONGODB_URI is missing from environment variables.');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // We use a typed interface to access the global promise without the 'var' keyword.
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, initialize a fresh client per standard protocol.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
