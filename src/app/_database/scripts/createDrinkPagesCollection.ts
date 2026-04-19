import mongoose from 'mongoose';
import { DrinkPageSchema } from '@/database/schemas/menu/DrinkPageSchema';
import { drinkPages } from '@/database/seed/drinkPagesSeed';

let databasePassword = process.env.DB_PASSWORD || '';
databasePassword = encodeURIComponent(databasePassword);

let databaseUri = process.env.MONGODB_URI;
if (!databaseUri) {
  throw new Error('MONGODB_URI environment variable is not set');
}
databaseUri = databaseUri.replace('<DB_PASSWORD>', databasePassword);

const dbName = process.env.DB_NAME || 'bossa_nova_restaurant';

async function run() {
  if (!databaseUri) {
    console.error('MONGODB_URI is not set');
    process.exit(1);
  }

  await mongoose.connect(databaseUri, { dbName });
  try {
    const { db } = mongoose.connection;
    if (!db) {
      console.error('No database connection available');
      process.exit(1);
    }

    const collName = 'drinkPages';

    const existing = (await db.listCollections({ name: collName }).toArray()).length > 0;
    if (existing) {
      console.log(`Collection "${collName}" already exists — will upsert seed data.`);
    } else {
      console.log(`Collection "${collName}" does not exist — it will be created.`);
    }

    // Use model bound to the collection name so mongoose applies schema when inserting
    const DrinkPage = mongoose.models.DrinkPage || mongoose.model('DrinkPage', DrinkPageSchema, collName);

    if (Array.isArray(drinkPages) && drinkPages.length > 0) {
      // Replace existing documents with seed to ensure deterministic state
      await db.collection(collName).deleteMany({});
      // Insert using the model to ensure schema casting
      await DrinkPage.insertMany(drinkPages);
      console.log(`Seeded ${drinkPages.length} documents into "${collName}".`);
    } else {
      if (!existing) {
        await db.createCollection(collName);
        console.log(`Created empty collection "${collName}".`);
      } else {
        console.log(`No seed data provided for "${collName}" — left unchanged.`);
      }
    }
  } catch (err) {
    console.error('Error creating/seeding drinkPages collection:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});