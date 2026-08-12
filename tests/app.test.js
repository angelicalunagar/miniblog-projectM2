// tests/app.test.js
import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "./app.js"; // Asegúrate de exportar 'app' desde tu archivo principal (app.js o server.js)

describe("Endpoints de Autores (/api/authors)", () => {
  // Test 1: Obtener todos los autores
  test("GET /api/authors debe retornar un status 200 y una lista de autores", async () => {
    const response = await request(app).get("/api/authors");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test 2: Obtener un autor por ID inexistente (404 Not Found)
  test("GET /api/authors/:id debe retornar un status 404 si el autor no existe", async () => {
    const response = await request(app).get("/api/authors/99999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  // Test 3: Crear autor fallido por datos faltantes (400 Bad Request)
  test("POST /api/authors debe retornar un status 400 si falta el nombre o el email", async () => {
    const response = await request(app)
      .post("/api/authors")
      .send({ bio: "Desarrollador full stack" }); // Faltan name y email

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  // Test 4: Crear autor fallido por formato de email inválido (400 Bad Request)
  test("POST /api/authors debe retornar un status 400 si el formato del email es inválido", async () => {
    const response = await request(app)
      .post("/api/authors")
      .send({ name: "Angélica", email: "correo-invalido" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("El formato del email es inválido");
  });

  // Test 5: Crear un autor exitosamente (201 Created)
  test("POST /api/authors debe retornar un status 201 y crear el autor si los datos son válidos", async () => {
    const uniqueEmail = `test_${Date.now()}@example.com`;
    const response = await request(app)
      .post("/api/authors")
      .send({
        name: "Angélica Luna",
        email: uniqueEmail,
        bio: "Estudiante de doctorado",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Angélica Luna");
  });

  // Test 6: Eliminar un autor inexistente (404 Not Found)
  test("DELETE /api/authors/:id debe retornar un status 404 si se intenta eliminar un autor que no existe", async () => {
    const response = await request(app).delete("/api/authors/99999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Author not found");
  });
});
