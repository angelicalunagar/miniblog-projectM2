-- Clear out any existing data (optional, but helpful if re-running)
TRUNCATE TABLE comments, posts, authors RESTART IDENTITY CASCADE;
SET client_encoding = 'UTF8';

-- Insertar authors de ejemplo de ejemplo
INSERT INTO authors (name, email, bio) VALUES
  ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
  ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
  ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST');

-- Insertar posts de ejemplo de ejemplo
INSERT INTO posts (title, content, author_id, published) VALUES
  ('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 1, true),
  ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),
  ('APIs RESTful', 'REST es un estilo arquitectónico...', 1, true),
  ('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),
  ('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 1, false);

-- Insertar comments de ejemplo
-- Al final el extra credit no se incluyó, pero se deja esquema para futura implementación
INSERT INTO comments (post_id, author_id, comment) VALUES
(1, 3, '¡Excelente artículo Carlos! Muy clara la explicación sobre las bases de datos.'),
(2, 1, 'Gracias Carlos, me alegra que te haya servido para el proyecto.'),
(4, 1, 'Express hace que las rutas sean muy limpias y fáciles de organizar.');