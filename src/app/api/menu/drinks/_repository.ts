import mongoose from 'mongoose';
import type { Db } from 'mongodb';
import { DrinkPageSchema } from '@/database/schemas/menu/DrinkPageSchema';
import { onDatabaseConnection } from '@/database/utils/connection';
import type { DrinkMenuPageData } from '@/types/DrinkMenuPageData';

const DB_NAME = process.env.DB_NAME;
const COLLECTION = 'drinkPages';

function getDrinkPagesModel(connection: typeof mongoose.connection) {
  return connection.models.DrinkPages || connection.model('DrinkPages', DrinkPageSchema, COLLECTION);
}

/**
 * Update the menu drinks pages' data from the database.
 * @param newDrinkPages The new drink page's data to be sent to the database.
 * @returns The drink pages data, or null if not found/error.
 */
const updateDrinkPages = async (newDrinkPages: DrinkMenuPageData[]): Promise<DrinkMenuPageData[] | null> => {
  const updateDrinkPagesData = async (database: Db, connection: mongoose.Connection): Promise<DrinkMenuPageData[]> => {
    const DrinkPagesModel = getDrinkPagesModel(connection);

    // First, delete the current drinkPages data
    await DrinkPagesModel.deleteMany({});

    // Then insert the new data
    const updatedDrinkPages = await DrinkPagesModel.insertMany(newDrinkPages, { ordered: true });

    return updatedDrinkPages;
  };

  const drinkPages = await onDatabaseConnection<DrinkMenuPageData[]>(DB_NAME, updateDrinkPagesData);

  return drinkPages;
};

export { updateDrinkPages };