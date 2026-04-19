import { Schema } from 'mongoose';

const MarketingSchema = new Schema(
  {
    instagram: {
      active: { type: Boolean, required: true },
      url: { type: String, required: false },
    },
    popin: {
      active: { type: Boolean, required: true },
      image: { type: String, required: false },
      altText: {
        fr: { type: String, required: false },
        pt: { type: String, required: false },
        en: { type: String, required: false },
      },
    },
  }
);

export { MarketingSchema };