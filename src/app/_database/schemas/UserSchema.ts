import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true }, // bcrypt hash
    role: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
  }
);

export { UserSchema };