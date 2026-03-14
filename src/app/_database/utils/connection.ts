import mongoose from 'mongoose';
import type { Db } from 'mongodb';

/**
 * Connect to MongoDB, run the callback with the native Db and mongoose connection,
 * then always disconnect. Returns the callback result or null on error.
 *
 * @param dbName - optional database name to pass to mongoose.connect
 * @param callback - async callback that receives (db, mongoose.connection)
 */
async function onDatabaseConnection<T>(
  dbName: string | undefined,
  callback: (database: Db, mongooseConn: mongoose.Connection) => Promise<T>
): Promise<T | null> {
  const uri = process.env.MONGODB_URI ?? process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI environment variable is not set');
    return null;
  }

  try {
    await mongoose.connect(uri, dbName ? { dbName } : undefined);
    const { db } = mongoose.connection;
    if (!db) {
      throw new Error('Connected but no db instance available');
    }

    // run user callback
    const result = await callback(db, mongoose.connection);
    return result;
  } catch (err) {
    console.error('Database connection / operation error:', err);
    process.exit(1);
  }
}

export { onDatabaseConnection };