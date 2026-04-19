import mongoose from 'mongoose';
import type { Db } from 'mongodb';

type extendedGlobal = typeof globalThis & {
  mongoose?: {
    instance: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

let cached = (globalThis as extendedGlobal).mongoose;

if (!cached) {
  cached = (globalThis as extendedGlobal).mongoose = { instance: null, promise: null };
}

async function connect(dbName?: string) {
  let databasePassword = process.env.DB_PASSWORD || '';
  databasePassword = encodeURIComponent(databasePassword);

  let databaseUri = process.env.MONGODB_URI;
  if (!databaseUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  databaseUri = databaseUri.replace('<DB_PASSWORD>', databasePassword);

  if (cached!.instance) return cached!.instance;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(databaseUri, dbName ? { dbName } : undefined);
  }

  cached!.instance = await cached!.promise;
  return cached!.instance;
}

/**
 * Connect to MongoDB and run the callback with the native Db and mongoose connection.
 * Returns the callback result or null on error.
 *
 * @param dbName - optional database name to pass to mongoose.connect
 * @param callback - async callback that receives (db, mongoose.connection)
 */
async function onDatabaseConnection<T>(
  dbName: string | undefined,
  callback: (database: Db, mongooseConn: mongoose.Connection) => Promise<T>
): Promise<T | null> {
  try {
    const instance = await connect(dbName);
    const db = instance.connection.db;
    if (!db) {
      throw new Error('Connected but no db instance available');
    }

    // run user callback
    const result = await callback(db, mongoose.connection);
    return result;
  } catch (error) {
    console.error('Database connection / operation error:', error);
    return null;
  }
}

export { onDatabaseConnection };