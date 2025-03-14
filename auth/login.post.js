// server/api/auth/login.post.ts
import { defineEventHandler, readBody, createError, setCookie } from 'h3';
import { connectToDatabase } from './utils/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

  const user = await usersCollection.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  setCookie(event, 'token', token, { httpOnly: true, maxAge: 3600 }); // 1 hour

  return { message: 'Login successful', token };
});