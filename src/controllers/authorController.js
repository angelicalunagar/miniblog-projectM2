// src/controllers/authorController.js
import authorService from "../services/authorService.js";
import { validarNombre, validarEmail } from "../utils/validators.js";
import { badRequest, notFound, conflict } from "../utils/errors.js";

export default {
  async getAll(req, res, next) {
    try {
      const authors = await authorService.getAll();
      res.json(authors);
    } catch (err) {
      next(err); // Envía el error al middleware centralizador
    }
  },
  async getById(req, res, next) {
    try {
      const author = await authorService.getById(req.params.id);
      if (!author) throw notFound("Author not found");
      res.json(author);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const { name, email, bio } = req.body;

      // 1. Validate Name
      const nameError = validarNombre(name);
      if (nameError) throw badRequest(nameError);

      // 2. Validate Email
      const emailError = validarEmail(email);
      if (emailError) throw badRequest(emailError);

      const newAuthor = await authorService.create({ name, email, bio });
      res.status(201).json(newAuthor);
    } catch (err) {
      // Catch PostgreSQL unique constraint violation (duplicate email)
      if (err.code === "23505") {
        return next(conflict("El email ya está registrado"));
      }
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      const { name, email, bio } = req.body;

      // 1. Validate Name
      const nameError = validarNombre(name);
      if (nameError) throw badRequest(nameError);

      // 2. Validate Email
      const emailError = validarEmail(email);
      if (emailError) throw badRequest(emailError);

      const updated = await authorService.update(req.params.id, {
        name,
        email,
        bio,
      });
      if (!updated) throw notFound("Author not found");
      res.json(updated);
    } catch (err) {
      // Catch PostgreSQL unique constraint violation on update
      if (err.code === "23505") {
        return next(conflict("El email ya está registrado"));
      }
      next(err);
    }
  },
  async delete(req, res, next) {
    try {
      const deleted = await authorService.delete(req.params.id);
      if (!deleted) throw notFound("Author not found");
      res.status(200).json({ message: "Author deleted", author: deleted });
    } catch (err) {
      next(err);
    }
  },
};
