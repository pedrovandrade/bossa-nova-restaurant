import mongoose from 'mongoose';

let databasePassword = process.env.DB_PASSWORD || '';
databasePassword = encodeURIComponent(databasePassword);

let databaseUri = process.env.MONGODB_URI;
if (!databaseUri) {
  throw new Error('MONGODB_URI environment variable is not set');
}
databaseUri = databaseUri.replace('<DB_PASSWORD>', databasePassword);

const dbName = process.env.DB_NAME || 'bossa_nova_restaurant';

/**
 * Create a view named "menu" that aggregates documents from drinkPages and foodPages
 * into a single document with shape:
 * { _id: "main", drinkPages: [...], foodPages: [...], lastUpdated: <now> }
 *
 * The view is created on top of the `drinkPages` collection and uses a pipeline
 * to lookup and aggregate the `foodPages` collection.
 */
async function run() {
  if (!databaseUri) {
    console.error('MONGODB_URI is not set');
    process.exit(1);
  }

  await mongoose.connect(databaseUri, { dbName });
  try {
    const db = mongoose.connection.db;
    if (!db) {
      console.error('No database connection available');
      process.exit(1);
    }

    const viewName = 'menu';
    const drinkColl = 'drinkPages';
    const foodColl = 'foodPages';

    // Drop existing menu view/collection if present (we want a view)
    const exists = (await db.listCollections({ name: viewName }).toArray()).length > 0;
    if (exists) {
      await db.collection(viewName).drop();
      console.log(`Dropped existing "${viewName}" (collection or view) to recreate as view.`);
    }

    // Aggregation pipeline to produce the desired single-document shape.
    // We group all drinkPages into an array and compute the max lastUpdated from drinks,
    // lookup foodPages and compute their max lastUpdated, then pick the most recent
    // of the two as the view's lastUpdated (fallback to $$NOW if none present).
    const pipeline = [
      {
        $group: {
          _id: null,
          drinkPages: { $push: '$$ROOT' },
          drinkLastUpdated: { $max: '$lastUpdated' }
        }
      },
      {
        $lookup: {
          from: foodColl,
          pipeline: [
            {
              $group: {
                _id: null,
                foodPages: { $push: '$$ROOT' },
                foodLastUpdated: { $max: '$lastUpdated' }
              }
            },
            { $project: { _id: 0, foodPages: 1, foodLastUpdated: 1 } }
          ],
          as: 'food'
        }
      },
      {
        $addFields: {
          foodPages: { $ifNull: [{ $arrayElemAt: ['$food.foodPages', 0] }, []] },
          foodLastUpdated: { $arrayElemAt: ['$food.foodLastUpdated', 0] }
        }
      },
      { $project: { food: 0 } },
      {
        $addFields: {
          lastUpdated: {
            $ifNull: [{ $max: ['$drinkLastUpdated', '$foodLastUpdated'] }, '$$NOW']
          }
        }
      },
      { $addFields: { _id: 'main' } },
      { $project: { _id: 1, drinkPages: 1, foodPages: 1, lastUpdated: 1 } }
    ];

    await db.createCollection(viewName, { viewOn: drinkColl, pipeline });
    console.log(`Created view "${viewName}" aggregating "${drinkColl}" and "${foodColl}".`);
  } catch (err) {
    console.error('Error creating menu view:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
