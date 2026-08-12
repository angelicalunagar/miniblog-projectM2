// tests/app.test.js
import { describe, test, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/config/db.js";

beforeEach(async()=>{
  await pool.query("TRUNCATE authors RESTART IDENTITY CASCADE");
  await pool.query(`INSERT INTO authors (name, email, bio) VALUES 
    ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
    ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
    ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST')
    `);
  // 2. Inserta los posts de ejemplo usando los IDs de los autores recién creados (1, 2, 3)
  await pool.query(`
    INSERT INTO posts (title, content, author_id, published) VALUES 
    ('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 1, true),
    ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),
    ('APIs RESTful', 'REST es un estilo arquitectónico...', 1, true),
    ('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),
    ('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 1, false)
  `);
});

afterAll(async () => {
  await pool.end();
});

describe("Endpoints de Autores (/authors)", () => {

  // Test 1: Obtener todos los autores
  test("GET /authors debe retornar un status 200 y una lista de autores", async () => {
    const response = await request(app).get("/authors");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(3); // Sabemos que hay 3 gracias al beforeEach
  });

  // Test 2: Obtener un autor por ID inexistente (404 Not Found)
  test("GET /authors/:id debe retornar un status 404 si el autor no existe", async () => {
    const response = await request(app).get("/authors/99999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  // Test 3: Crear autor fallido por datos faltantes (400 Bad Request)
  test("POST /authors debe retornar un status 400 si falta el nombre o el email", async () => {
    const response = await request(app)
      .post("/authors")
      .send({ bio: "Desarrollador full stack" }); // Faltan name y email

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  // Test 4: Crear autor fallido por formato de email inválido (400 Bad Request)
  test("POST /authors debe retornar un status 400 si el formato del email es inválido", async () => {
    const response = await request(app)
      .post("/authors")
      .send({ name: "Angélica", email: "correo-invalido" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("El formato del email es inválido");
  });

  // Test 5: Crear un autor exitosamente (201 Created)
  test("POST /authors debe retornar un status 201 y crear el autor si los datos son válidos", async () => {
    const uniqueEmail = `test_${Date.now()}@example.com`;
    const response = await request(app)
      .post("/authors")
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
  test("DELETE /authors/:id debe retornar un status 404 si se intenta eliminar un autor que no existe", async () => {
    const response = await request(app).delete("/authors/99999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Author not found");
  });
});

// TEST DE "posts"
describe('Endpoints de Posts (/posts)', () => {
  
  test('Flujo completo: Crear, Obtener por ID, Actualizar y Eliminar el mismo post', async () => {
    
    // 1. POST /posts (Usamos el author_id: 1 que sabemos que el beforeEach creó con seguridad)
    const createRes = await request(app)
      .post('/posts')
      .send({
        title: 'Mi primer post de prueba',
        content: 'Este es el contenido original del artículo.',
        author_id: 1,
        published: false
      });

    expect(createRes.status).toBe(201);
    expect(createRes.body).toHaveProperty('id');
    const postId = createRes.body.id; // Guardamos el ID para usarlo en los siguientes tests
    expect(createRes.body.title).toBe('Mi primer post de prueba');

    // 2. GET posts/:id (Obtener el post recién creado)
    const getRes = await request(app).get(`/posts/${postId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(postId);
    expect(getRes.body.content).toBe('Este es el contenido original del artículo.');

    // 3. PUT posts/:id (Actualizar el post)
    const updateRes = await request(app)
      .put(`/posts/${postId}`)
      .send({
        title: 'Título actualizado del post',
        content: 'Contenido editado exitosamente.',
        author_id: 1,
        published: true
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.title).toBe('Título actualizado del post');
    expect(updateRes.body.published).toBe(true);

    // 4. DELETE /posts/:id (Eliminar el mismo post que se publicó)
    const deleteRes = await request(app).delete(`/posts/${postId}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty('message');

    // 5. Verificar que el post ya fue eliminado intentando consultarlo (Debe retornar 404)
    const verifyRes = await request(app).get(`/posts/${postId}`);
    expect(verifyRes.status).toBe(404);
    expect(verifyRes.body).toHaveProperty('error');
  });

});
