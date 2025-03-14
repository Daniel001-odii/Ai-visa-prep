// server/api/auth/register.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import { connectToDatabase } from '../../utils/db';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    });
  }

  const { db } = await connectToDatabase();
  const usersCollection = db.collection('users');

  // Check if user already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User already exists',
    });
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insert new user
  const user = {
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };
  await usersCollection.insertOne(user);

  return { message: 'User registered successfully' };
});