// src/middleware.ts
import { defineMiddleware } from 'astro/middleware';

// Jika Anda tidak membutuhkan middleware, kosongkan saja
export const onRequest = defineMiddleware((context, next) => {
  // Tambahkan logika middleware di sini jika diperlukan
  // Atau kosongkan jika tidak digunakan
  return next();
});