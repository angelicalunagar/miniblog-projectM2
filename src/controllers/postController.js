// src/controllers/postController.js
import postService from "../services/postService.js";
import { validarPost } from "../utils/validators.js";
import { badRequest, notFound } from "../utils/errors.js";

export default {
  async getAll(req, res, next) {
    try {
      const posts = await postService.getAll();
      res.json(posts);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const post = await postService.getById(req.params.id);
      if (!post) throw notFound("Post not found");
      res.json(post);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { title, content, author_id, published } = req.body;

      // 1. Validate fields using validarPost
      const validationError = validarPost({ title, content, author_id });
      if (validationError) {
        throw badRequest(validationError);
      }

      // 2. Create post (passing published too, which defaults to false if omitted)
      const newPost = await postService.create({
        title,
        content,
        author_id,
        published,
      });
      res.status(201).json(newPost);
    } catch (err) {
      // Catch PostgreSQL Foreign Key violation (Error 23503: author_id doesn't exist)
      if (err.code === "23503") {
        return next(
          badRequest("El author_id especificado no existe en la base de datos"),
        );
      }
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { title, content, author_id, published } = req.body;

      // Validate fields on update
      const validationError = validarPost({ title, content, author_id });
      if (validationError) {
        throw badRequest(validationError);
      }

      const updated = await postService.update(req.params.id, {
        title,
        content,
        author_id,
        published,
      });
      if (!updated) throw notFound("Post not found");
      res.json(updated);
    } catch (err) {
      if (err.code === "23503") {
        return next(
          badRequest("El author_id especificado no existe en la base de datos"),
        );
      }
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const deleted = await postService.delete(req.params.id);
      if (!deleted) throw notFound("Post not found");
      res.status(200).json({ message: "Post deleted", post: deleted });
    } catch (err) {
      next(err);
    }
  },
};
