import { Schema } from 'mongoose';
import { DrinkPageSchema } from './DrinkPageSchema';
import { FoodPageSchema } from './FoodPageSchema';

const MenuSchema = new Schema(
  {
    _id: { type: String, required: true },
    drinkPages: { type: [DrinkPageSchema], required: true },
    foodPages: { type: [FoodPageSchema], required: true },
    lastUpdated: { type: Date, required: true },
  },
  { versionKey: false }
);

export { MenuSchema };