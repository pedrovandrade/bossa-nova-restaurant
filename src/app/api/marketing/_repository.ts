import mongoose from 'mongoose';
import { onDatabaseConnection } from '@/database/utils/connection';
import { MarketingSchema } from '@/database/schemas/MarketingSchema';
import { MarketingData } from '@/types/MarketingData';
import { Db } from 'mongodb';

type ProjectionFilter = {
  field: string,
};

const DB_NAME = process.env.MONGODB_DB || process.env.DB_NAME || 'bossa_nova_restaurant';
const COLLECTION = 'marketing';

function getMarketingModel(conn: typeof mongoose.connection) {
  return conn.models.Marketing || conn.model('Marketing', MarketingSchema, COLLECTION);
}

/**
 * Validate and canonicalize Instagram post URL by:
 * - checkign the https://www.instagram.com origin
 * - requiring a `/p/{code}` path segment
 * @param raw The non-processed input URL string.
 * @returns canonical `https://www.instagram.com/p/{code}/` (no query string)
 * @throws Error on invalid input.
 */
function processInstagramUrl(raw: unknown): string {
  if (!raw || typeof raw !== 'string') {
    throw new Error('instagram.url must be a string');
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('Invalid instagram.url');
  }

  if (url.protocol !== 'https:' || url.hostname !== 'www.instagram.com') {
    throw new Error('instagram.url must have origin https://www.instagram.com');
  }

  // Find the first occurrence of /p/{code} in the path and extract the code.
  // This allows inputs like /username/p/{code}/... to be transformed to /p/{code}/
  const match = url.pathname.match(/\/p\/([^\/\?#]+)/);
  if (!match) {
    throw new Error('instagram.url must point to an Instagram post with path /p/{post-code}');
  }

  const code = match[1];
  // Return canonical form without query or hash and with trailing slash.
  return `https://www.instagram.com/p/${code}`;
}

/**
 * Read marketing data.
 * - If `filter` is provided, returns a single document matching the filter (or null).
 * - If no filter is provided, returns an array with all documents.
 */
const getMarketingData = async (filter?: ProjectionFilter): Promise<MarketingData | null> => {
  const retrieveMarketingData = async (database: Db, connection: mongoose.Connection) => {
    const MarketingModel = getMarketingModel(connection);

    if (filter?.field) {
      const doc = await MarketingModel.findOne({}, { [filter.field]: 1, _id: 0, __v: 0, }).lean().exec();
      return doc;
    }

    const docs = await MarketingModel.findOne({}, { _id: 0, __v: 0, }).lean().exec();
    return docs;
  };

  const marketingData = await onDatabaseConnection<MarketingData | null>(DB_NAME, retrieveMarketingData);
  
  return marketingData;
};

/**
 * Create a new marketing document only if there is no existing marketing document.
 * @param payload The marketing data to be created
 * @param id The id to be put on the new document (for MongoDB)
 * @returns created document or null if a marketing document already exists or on error.
 */
const createMarketingData = async (payload: MarketingData, id?: string): Promise<MarketingData | null> => {
  const createFn = async (_db: Db, connection: mongoose.Connection) => {
    const MarketingModel = getMarketingModel(connection);
    const exists = await MarketingModel.findOne({}).lean().exec();
    if (exists) {
      return null; // caller can interpret as conflict
    }
    
    // preprocess instagram.url if present
    const toInsert = { ...payload } as MarketingData & {_id: string};
    if (toInsert.instagram?.url) {
      toInsert.instagram = { ...(toInsert.instagram || {}) };
      toInsert.instagram.url = processInstagramUrl(toInsert.instagram.url);
    }

    // ensure an _id is present for deterministic single-document collection
    toInsert._id = id ?? 'main';
   
    const created = await MarketingModel.create(toInsert);
    return created.toObject ? created.toObject() : created;
  };

  return onDatabaseConnection<MarketingData | null>(DB_NAME, createFn);
};

/**
 * Update the existing marketing document with provided patch.
 * @param payload The marketing data to be updated
 * @returns the updated document or null if none existed.
 */
const updateMarketingData = async (payload: MarketingData): Promise<MarketingData | null> => {
  const updateFn = async (_db: Db, connection: mongoose.Connection) => {
    const MarketingModel = getMarketingModel(connection);

    // preprocess instagram.url if present in patch
    const patch = { ...payload };
    if (patch.instagram?.url) {
      patch.instagram = { ...(patch.instagram || {}) };
      patch.instagram.url = processInstagramUrl(patch.instagram.url);
    }
   
    // find the single marketing doc and update it
    const updated = await MarketingModel.findOneAndUpdate(
      {},
      { $set: patch },
      { new: true, lean: true }
    ).exec();
    return updated ?? null;
  };

  return onDatabaseConnection<MarketingData | null>(DB_NAME, updateFn);
};

export { getMarketingData, createMarketingData, updateMarketingData };