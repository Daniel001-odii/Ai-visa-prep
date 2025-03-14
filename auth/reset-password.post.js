// server/api/auth/reset-password.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import { connectToDatabase } from './utils/db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
    });
  }

  const { db } = await connectToDatabase();
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ email });
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    });
  }

  // Generate reset token (simplified; in production, send via email)
  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
  
  // Store reset token in DB (optional, for validation)
  await usersCollection.updateOne({ email }, { $set: { resetToken, resetTokenExpires: Date.now() + 15 * 60 * 1000 } });

  return { message: 'Password reset token generated', resetToken }; // In production, email this instead
});