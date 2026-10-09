import mongoose from 'mongoose';

let databasePassword = process.env.DB_PASSWORD || '';
databasePassword = encodeURIComponent(databasePassword);

const configuredDatabaseUri = process.env.MONGODB_URI;
if (!configuredDatabaseUri) {
  throw new Error('MONGODB_URI environment variable is not set');
}
const databaseUri = configuredDatabaseUri.replace('<DB_PASSWORD>', databasePassword);

const dbName = process.env.DB_NAME || 'bossa_nova_restaurant';

const knownPages = [
  {
    pageNumber: 1,
    titles: {
      fr: 'Entrées ou tapas à partager',
      en: 'Starters or tapas to share',
      pt: 'Entradas ou tapas para compartilhar',
    },
  },
  {
    pageNumber: 2,
    titles: {
      fr: 'Plats',
      en: 'Main Courses',
      pt: 'Pratos',
    },
  },
  {
    pageNumber: 3,
    titles: {
      fr: 'Desserts',
      en: 'Desserts',
      pt: 'Sobremesas',
    },
  },
];

async function run() {
  await mongoose.connect(databaseUri, { dbName });
  try {
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('No database connection available');
    }

    const collection = db.collection('foodPages');
    const documents = await collection.find({}, { projection: { title: 1, pageNumber: 1 } }).toArray();
    if (documents.length !== knownPages.length) {
      throw new Error(`Expected ${knownPages.length} food pages, found ${documents.length}`);
    }

    const updates = documents.map((document) => {
      const title = document.title as Record<string, string> | undefined;
      const page = knownPages.find((knownPage) =>
        Object.entries(knownPage.titles).some(([locale, value]) => title?.[locale] === value)
      );
      if (!page) {
        throw new Error(`Could not identify food page from title: ${JSON.stringify(title)}`);
      }
      return {
        updateOne: {
          filter: { _id: document._id },
          update: { $set: { pageNumber: page.pageNumber } },
        },
      };
    });

    const assignedPageNumbers = updates.map((update) => update.updateOne.update.$set.pageNumber);
    if (new Set(assignedPageNumbers).size !== knownPages.length) {
      throw new Error('Food page titles did not identify one unique document for each page number');
    }

    await collection.bulkWrite(updates);
    console.log('Assigned page numbers to all food pages.');
  } catch (err) {
    console.error('Error migrating food page numbers:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});