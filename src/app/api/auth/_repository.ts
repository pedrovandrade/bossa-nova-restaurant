import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { onDatabaseConnection } from '@/database/utils/connection';
import { UserSchema } from '@/database/schemas/UserSchema';
import { z } from 'zod';
import { Db } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || process.env.DB_NAME || 'bossa_nova_restaurant';
const COLLECTION = 'users';
const AUTH_SECRET = process.env.AUTH_SECRET || '';

function getUserModel(conn: typeof mongoose.connection) {
  return conn.models.User || conn.model('User', UserSchema, COLLECTION);
}

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

/**
 * Verify credentials against the users collection.
 * - Validates input with zod
 * - Loads user by email
 * - Compares bcrypt(password + AUTH_SECRET) against stored hash
 * - Returns public user object on success, null on failure
 */
export async function verifyUserCredentials(input: unknown): Promise<{ id: string; email: string; role?: string } | null> {
  const parsed = credentialsSchema.safeParse(input);
  if (!parsed.success) return null;
  const { email, password } = parsed.data;

  const fn = async (db: Db, connection: mongoose.Connection) => {
    const User = getUserModel(connection);
    const user = await User.findOne({ email }).lean().exec();
    if (!user || !user.password) return null;

    // stored password might be a string (bcrypt hash) or object; handle both
    const storedHash = typeof user.password === 'string' ? user.password : (user.password.hash ?? user.password);

    const ok = await bcrypt.compare(`${password}${AUTH_SECRET}`, storedHash);
    if (!ok) return null;

    return { id: String(user._id), email: user.email, role: user.role } as { id: string; email: string; role?: string };
  };

  return onDatabaseConnection<{ id: string; email: string; role?: string } | null>(DB_NAME, fn);
}