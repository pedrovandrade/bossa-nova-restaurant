import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserSchema } from '@/database/schemas/UserSchema';

let databasePassword = process.env.DB_PASSWORD || '';
databasePassword = encodeURIComponent(databasePassword);

let databaseUri = process.env.MONGODB_URI;
if (!databaseUri) {
  throw new Error('MONGODB_URI environment variable is not set');
}
databaseUri = databaseUri.replace('<DB_PASSWORD>', databasePassword);

const dbName = process.env.DB_NAME || 'bossa_nova_restaurant';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_SECRET = process.env.AUTH_SECRET;
const COLLECTION = 'users';

if (!databaseUri) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in env');
  process.exit(1);
}
if (!AUTH_SECRET) {
  console.error('AUTH_SECRET must be set in env');
  process.exit(1);
}

/**
 * Create bcrypt hash using AUTH_SECRET as a "pepper".
 * bcrypt internally generates a salt so separate salt storage is not required.
 */
async function hashPassword(password: string, pepper: string) {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
  const toHash = `${password}${pepper}`; // pepper appended to password
  const hash = await bcrypt.hash(toHash, saltRounds);
  return hash;
}

async function run() {
  await mongoose.connect(databaseUri ?? '', { dbName });

  try {
    const { db } = mongoose.connection;
    if (!db) {
      console.error('No database connection available');
      process.exit(1);
    }

    const exists = (await db.listCollections({ name: COLLECTION }).toArray()).length > 0;
    if (exists) {
      console.log(`Collection "${COLLECTION}" already exists — will upsert admin user.`);
    } else {
      console.log(`Collection "${COLLECTION}" does not exist — it will be created on write.`);
    }

    const User = mongoose.models.User || mongoose.model('User', UserSchema, COLLECTION);

    // create bcrypt password hash
    const hash = await hashPassword(ADMIN_PASSWORD as string, AUTH_SECRET as string);

    const now = new Date();
    const upsertDoc = {
      email: ADMIN_EMAIL,
      role: 'owner',
      password: hash,
      createdAt: now,
      updatedAt: now,
    };

    // Upsert admin user by email (create if missing, replace password & role if exists)
    const res = await User.updateOne(
      { email: ADMIN_EMAIL },
      { $set: upsertDoc },
      { upsert: true }
    );

    console.log(`Admin user seeded/updated for "${ADMIN_EMAIL}". Result:`, {
      matchedCount: res.matchedCount,
      modifiedCount: res.modifiedCount,
      upsertedId: res.upsertedId,
    });
  } catch (err) {
    console.error('Error creating/seeding users collection:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
