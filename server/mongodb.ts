import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "abucore";

// Cache the connection across serverless invocations to avoid exhausting
// the Atlas connection pool on every cold start.
let clientPromise: Promise<MongoClient> | undefined = (globalThis as any).__abucoreMongo;

function getClientPromise(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
    (globalThis as any).__abucoreMongo = clientPromise;
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
