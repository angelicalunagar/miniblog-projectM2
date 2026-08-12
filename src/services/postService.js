// src/services/postService.js
import pool from "../config/db.js";

export default {
  async getAll() {
    const query = "SELECT * FROM posts ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  },

  async getById(id) {
    const query = "SELECT * FROM posts WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async create({ title, content, author_id, published = false }) {
    const query = `
      INSERT INTO posts (title, content, author_id, published) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const values = [title, content, author_id, published];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async update(id, { title, content, author_id, published = false }) {
    const query = `
      UPDATE posts 
      SET title = $1, content = $2, author_id = $3, published = $4 
      WHERE id = $5 
      RETURNING *
    `;
    const values = [title, content, author_id, published, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(id) {
    const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
