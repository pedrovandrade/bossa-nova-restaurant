import { Schema } from 'mongoose';

const TimespanSchema = new Schema(
  {
    begin: { type: String, required: true },
    end: { type: String, required: true },
  }
);

const OpeningHoursDaySchema = new Schema(
  {
    isOpen: { type: Boolean, required: true },
    timespans: [TimespanSchema],
  }
);

const OpeningHoursSchema = new Schema(
  {
    monday: OpeningHoursDaySchema,
    tuesday: OpeningHoursDaySchema,
    wednesday: OpeningHoursDaySchema,
    thursday: OpeningHoursDaySchema,
    friday: OpeningHoursDaySchema,
    saturday: OpeningHoursDaySchema,
    sunday: OpeningHoursDaySchema,
  }
);

export { OpeningHoursSchema };