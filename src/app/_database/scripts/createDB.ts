import { MongoClient } from 'mongodb';

let databasePassword = process.env.DB_PASSWORD || '';
databasePassword = encodeURIComponent(databasePassword);

let databaseUri = process.env.MONGODB_URI;
if (!databaseUri) {
  throw new Error('MONGODB_URI environment variable is not set');
}
databaseUri = databaseUri.replace('<DB_PASSWORD>', databasePassword);

const dbName = process.env.DB_NAME || 'bossa_nova_restaurant';

async function createDatabase(): Promise<boolean> {
  const client = new MongoClient(databaseUri ?? '');
  try {
    await client.connect();

    // check existing databases
    const admin = client.db().admin();
    const { databases } = await admin.listDatabases();
    const exists = databases.some((d) => d.name === dbName);

    if (exists) {
      console.log(`Database "${dbName}" already exists — nothing to do.`);
      return false;
    }

    // create db by creating a default collection (menu)
    const db = client.db(dbName);
    await db.createCollection('menu');
    console.log(`Database "${dbName}" created with collection "menu".`);
    return true;
  } catch (error) {
    console.error('Error creating database:', error);
    return false;
  } finally {
    await client.close();
  }
}

createDatabase();