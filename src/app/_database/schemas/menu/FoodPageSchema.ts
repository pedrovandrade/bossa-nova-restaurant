import { Schema } from 'mongoose';
import { LocalizedTextSchema, LocalizedTextArraySchema } from '@/database/schemas/LocalizedTextSchema';

const FoodItemSchema = new Schema(
  {
    name: { type: LocalizedTextSchema, required: true },
    description: { type: LocalizedTextArraySchema, required: false },
    price: { type: Number, required: false },
  },
  { _id: false }
);

const FoodPageSchema = new Schema(
  {
    title: { type: LocalizedTextSchema, required: true },
    lastUpdated: { type: Date, required: true },
    items: { type: [FoodItemSchema], required: true },
    footer: {
      notes: { type: LocalizedTextArraySchema, required: false },
      generalNote: { type: LocalizedTextSchema, required: false },
    },
  },
  { _id: false }
);

export { FoodPageSchema };