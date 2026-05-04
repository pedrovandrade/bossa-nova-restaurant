import mongoose from 'mongoose';
import type { Db } from 'mongodb';
import { FoodPageSchema } from '@/database/schemas/menu/FoodPageSchema';
import { onDatabaseConnection } from '@/database/utils/connection';
import { FoodMenuPageData } from '@/app/_types/FoodMenuPageData';

const DB_NAME = process.env.DB_NAME;
const COLLECTION = 'foodPages';

function getFoodPagesModel(connection: typeof mongoose.connection) {
  return connection.models.FoodPages || connection.model('FoodPages', FoodPageSchema, COLLECTION);
}

/**
 * Update the menu food pages' data from the database.
 * @param newFoodPages The new food page's data to be sent to the database.
 * @returns The food pages data, or null if not found/error.
 */
const updateFoodPages = async (newFoodPages: FoodMenuPageData[]): Promise<FoodMenuPageData[] | null> => {
  const updateFoodPagesData = async (database: Db, connection: mongoose.Connection): Promise<FoodMenuPageData[]> => {
    const FoodPagesModel = getFoodPagesModel(connection);

    // First, delete the current foodPages data
    await FoodPagesModel.deleteMany({});

    // Then insert the new data
    const updatedFoodPages = await FoodPagesModel.insertMany(newFoodPages, { ordered: true });

    return updatedFoodPages;
  };

  const foodPages = await onDatabaseConnection<FoodMenuPageData[]>(DB_NAME, updateFoodPagesData);

  return foodPages;
};

export { updateFoodPages };