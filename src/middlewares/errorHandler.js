// src/middlewares/errorHandler.js

export function errorHandler(err, req, res, next) {
  // Determinar el código de estado
  const statusCode = err.statusCode || err.status || 500;

  // Determinar el mensaje
  const message = err.message || "Error interno del servidor";

  console.error("Error capturado:", {
    status: statusCode,
    message,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Responder con formato consistente
  res.status(statusCode).json({
    error: message,
    status: statusCode,
  });
}
