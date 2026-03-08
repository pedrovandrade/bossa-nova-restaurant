import { Schema } from 'mongoose';
import { LocalizedTextSchema } from '@/database/schemas/LocalizedTextSchema';

const DrinkNameSchema = new Schema(
  {
    text: { type: LocalizedTextSchema, required: true },
    bold: { type: Boolean, required: false },
  },
  { _id: false }
);

const DrinkDescriptionSchema = new Schema(
  {
    text: { type: LocalizedTextSchema, required: true },
    position: { type: String, enum: ['top', 'bottom', 'inline'], required: false },
    bold: { type: Boolean, required: false },
    small: { type: Boolean, required: false },
  },
  { _id: false }
);

const DrinkSchema = new Schema(
  {
    name: { type: DrinkNameSchema, required: true },
    description: { type: DrinkDescriptionSchema, required: false },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const DrinkNoteSchema = new Schema(
  {
    text: { type: LocalizedTextSchema, required: true },
    inline: { type: Boolean, required: false },
    bold: { type: Boolean, required: false },
  },
  { _id: false }
);

const DrinkPageItemSchema = new Schema(
  {
    category: { type: LocalizedTextSchema, required: true },
    inline: { type: Boolean, required: false },
    note: { type: DrinkNoteSchema, required: false },
    drinks: { type: [DrinkSchema], required: true },
  },
  { _id: false }
);

const DrinkPageSchema = new Schema(
  {
    title: { type: LocalizedTextSchema, required: true },
    items: { type: [DrinkPageItemSchema], required: true },
    lastUpdated: { type: Date, required: true },
  },
  { _id: false }
);

export { DrinkPageSchema };