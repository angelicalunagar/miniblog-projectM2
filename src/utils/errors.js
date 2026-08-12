// src/utils/errors.js

export function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

// 400: Para datos inválidos o requeridos faltantes (nombres, emails mal formados)
export function badRequest(message) {
  return createError(message, 400);
}

// 400 / 409: Específico para conflictos como un email duplicado
export function conflict(message) {
  return createError(message, 400); // Usamos 400 para coincidir con tu validación actual
}

// 404: Cuando un autor no existe en la base de datos (getById, update, delete)
export function notFound(message = 'Author not found') {
  return createError(message, 404);
}

// 500: Para fallos inesperados de la base de datos o del servidor
export function internalError(message = 'Internal Server Error') {
  return createError(message, 500);
}