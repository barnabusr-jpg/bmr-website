import { MongoClient } from 'mongodb';

// 🛡️ Global Type Augmentation
// This informs TypeScript that the global object may contain our MongoDB promise.
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('! CONFIG_ERROR: MONGODB_URI is missing from environment variables.');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, we use the global variable to prevent multiple connections during HMR.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, we initialize a fresh client.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
