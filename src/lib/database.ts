import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || 'bmr_forensic';

if (!MONGODB_URI) {
  throw new Error('PROTOCOL_ERROR: MONGODB_URI_MISSING // CHECK_ENV_VARIABLES');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and function invocations in production.
 */
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Set the connection options for maximum stability
  const opts = {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  };

  const client = new MongoClient(MONGODB_URI, opts);
  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function saveLead(lead: any): Promise<void> {
  const { db } = await connectToDatabase();
  const collection = db.collection('leads');
  
  // Forensic validation before insertion
  if (!lead.email || !lead.transmissionId) {
    throw new Error('DATA_INTEGRITY_VIOLATION // MALFORMED_LEAD_OBJECT');
  }

  await collection.insertOne({
    ...lead,
    timestamp: new Date().toISOString(),
    verified: true
  });
}
