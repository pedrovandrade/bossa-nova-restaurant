import mongoose from 'mongoose';
import { onDatabaseConnection } from '@/database/utils/connection';
import { OpeningHoursSchema } from '@/database/schemas/OpeningHoursSchema';
import { Db } from 'mongodb';
import { OpeningHoursData } from '@/types/OpeningHoursData';

type MongoObj<T> = T & {
  _id?: string,
  __v?: number,
};

type OpeningHoursDayResponse = {
  isOpen: boolean,
  timespans: MongoObj<{
    begin: string,
    end: string,
  }>[],
};

type OpeningHoursResponse = {
  monday: MongoObj<OpeningHoursDayResponse>,
  tuesday: MongoObj<OpeningHoursDayResponse>,
  wednesday: MongoObj<OpeningHoursDayResponse>,
  thursday: MongoObj<OpeningHoursDayResponse>,
  friday: MongoObj<OpeningHoursDayResponse>,
  saturday: MongoObj<OpeningHoursDayResponse>,
  sunday: MongoObj<OpeningHoursDayResponse>,
};

type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const DB_NAME = process.env.MONGODB_DB || process.env.DB_NAME || 'bossa_nova_restaurant';
const COLLECTION = 'openingHours';

const cleanupFields = (response: OpeningHoursResponse): OpeningHoursData => {
  const copy = {...response};
  Object.keys(copy).forEach((weekday) => {
    if (!weekdays.includes(weekday)) return;
    if (copy[weekday as Weekday]?._id) delete copy[weekday as Weekday]._id;

    const timespansCopy = [...(copy[weekday as Weekday]?.timespans || [])];
    timespansCopy.forEach(timespan => {
      if (timespan?._id) delete timespan?._id;
    });
    copy[weekday as Weekday].timespans = timespansCopy;
  });

  return copy;
};

function getOpeningHoursModel(conn: typeof mongoose.connection) {
  return conn.models.OpeningHours || conn.model('OpeningHours', OpeningHoursSchema, COLLECTION);
}

/**
 * Read opening hours data.
 */
const getOpeningHours = async (): Promise<OpeningHoursData | null> => {
  const retrieveOpeningHours = async (database: Db, connection: mongoose.Connection) => {
    const OpeningHoursModel = getOpeningHoursModel(connection);

    const doc = await OpeningHoursModel.findOne({}, { _id: 0, __v: 0 }).lean().exec();
    const response = cleanupFields(doc);
    return response;
  };

  const openingHours = await onDatabaseConnection<OpeningHoursData | null>(DB_NAME, retrieveOpeningHours);
  
  return openingHours;
};

/**
 * Create opening hours document if none exists.
 * @param payload The opening hours data to be created.
 * @param id The id to be put on the new document (for MongoDB).
 * @returns created OpeningHoursData or null if a document already exists / on error.
 */
const createOpeningHours = async (payload: OpeningHoursData, id?: string): Promise<OpeningHoursData | null> => {
  const createFn = async (_db: Db, connection: mongoose.Connection) => {
    const Model = getOpeningHoursModel(connection);
    const exists = await Model.findOne({}).lean().exec();
    if (exists) return null; // already present

    const toInsert = { ...payload, _id: id ?? 'main' };
    const createdDoc = await Model.create(toInsert);
    const created = createdDoc.toObject ? createdDoc.toObject() : createdDoc;
    // cleanup nested _id fields before returning
    return cleanupFields(created as OpeningHoursResponse);
  };

  return onDatabaseConnection<OpeningHoursData | null>(DB_NAME, createFn);
};

/**
 * Update existing opening hours document.
 * @param patch The opening hours data to be updated.
 * @returns updated OpeningHoursData or null if none existed.
 */
const updateOpeningHours = async (patch: OpeningHoursData): Promise<OpeningHoursData | null> => {
  const updateFn = async (_db: Db, connection: mongoose.Connection) => {
    const Model = getOpeningHoursModel(connection);
    const updated = await Model.findOneAndUpdate(
      {},
      { $set: patch },
      { new: true, lean: true }
    ).exec();

    if (!updated) return null;
    return cleanupFields(updated as OpeningHoursResponse);
  };

  return onDatabaseConnection<OpeningHoursData | null>(DB_NAME, updateFn);
};

export { getOpeningHours, createOpeningHours, updateOpeningHours };