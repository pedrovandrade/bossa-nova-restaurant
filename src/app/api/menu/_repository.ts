import mongoose from 'mongoose';
import type { Db } from 'mongodb';
import { MenuSchema } from '@/database/schemas/menu/MenuSchema';
import { onDatabaseConnection } from '@/database/utils/connection';
import type { DrinkMenuPageData } from '@/types/DrinkMenuPageData';
import type { FoodMenuPageData } from '@/types/FoodMenuPageData';

export type GetMenuResponse = {
  drinkPages: DrinkMenuPageData[];
  foodPages: FoodMenuPageData[];
  lastUpdated?: string;
};

type MongoObj<T> = T & {
  _id?: string,
  __v?: number,
};

const DB_NAME = process.env.DB_NAME;

const cleanupFields = (list: MongoObj<Record<string, unknown>>[]): Record<string, unknown>[] => (
  list.map((elem) => {
    const copy = {...elem};
    delete copy._id;
    delete copy.__v;
    return copy;
  })
);

/**
 * Fetch the menu data from the database as a view combining drinkPages and foodPages.
 * @returns The menu data from the "menu" view, or null if not found/error.
 */
const getMenu = async (): Promise<GetMenuResponse | null> => {
  const retrieveMenuData = async (database: Db, connection: mongoose.Connection): Promise<GetMenuResponse | null> => {
    const MenuModel =
    connection.models.MenuView ||
    mongoose.model(
      'MenuView',
      MenuSchema,
      'menu' // bind to the "menu" view/collection
    );

    // Try to read the view. Views are read-only; a single document with _id 'main' is expected.
    const menu = await MenuModel.findOne({ _id: 'main' }).lean().exec();

    if (!menu) return null;

    // Ensure the returned object matches GetMenuResponse shape as best-effort
    return {
      drinkPages: Array.isArray(menu.drinkPages) ? cleanupFields(menu.drinkPages) as DrinkMenuPageData[] : [],
      foodPages: Array.isArray(menu.foodPages) ? cleanupFields(menu.foodPages) as FoodMenuPageData[] : [],
      lastUpdated: menu.lastUpdated,
    };
  };

  const menu = await onDatabaseConnection<GetMenuResponse | null>(DB_NAME, retrieveMenuData);

  return menu;
};

export { getMenu };