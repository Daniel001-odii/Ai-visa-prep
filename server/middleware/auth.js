// server/middleware/auth.ts
import { defineEventHandler, getCookie, createError } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler((event) => {
  const token = getCookie(event, 'token');
  /* if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    event.context.user = decoded; // Attach user info to context
  } catch (err) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
    });
  } */
});