import mongoose from 'mongoose';
import { OpeningHoursSchema } from '@/database/schemas/OpeningHoursSchema';
import { openingHours } from '@/database/seed/openingHoursSeed';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || process.env.DB_NAME || 'bossa_nova_restaurant';
const COLL_NAME = 'openingHours';

async function run() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
  try {
    const { db } = mongoose.connection;
    if (!db) {
      console.error('No database connection available');
      process.exit(1);
    }

    const exists = (await db.listCollections({ name: COLL_NAME }).toArray()).length > 0;
    if (exists) {
      console.log(`Collection "${COLL_NAME}" already exists — will upsert seed document.`);
    } else {
      console.log(`Collection "${COLL_NAME}" does not exist — it will be created on write.`);
    }

    const OpeningHours =
      mongoose.models.OpeningHours || mongoose.model('OpeningHours', OpeningHoursSchema, COLL_NAME);

    // expect seed export to be an object representing the single opening hours document
    const doc = openingHours ?? {};

    const res = await OpeningHours.insertOne({ ...doc });
    console.log(`Upserted openingHours document with _id="${res._id}". Result:`, res);
  } catch (err) {
    console.error('Error creating/seeding openingHours collection:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1)
});