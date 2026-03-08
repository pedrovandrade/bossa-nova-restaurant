import { Schema } from 'mongoose';

const LocalizedTextSchema = new Schema(
  {
    fr: { type: String, required: false },
    en: { type: String, required: false },
    pt: { type: String, required: false },
  },
  {
    strict: false,
    _id: false
  }
);

const LocalizedTextArraySchema = new Schema(
  {
    fr: { type: [String], required: false },
    en: { type: [String], required: false },
    pt: { type: [String], required: false },
  },
  {
    strict: false,
    _id: false
  }
);

export { LocalizedTextSchema, LocalizedTextArraySchema };
