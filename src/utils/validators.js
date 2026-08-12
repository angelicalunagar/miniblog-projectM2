// src/utils/validators.js

export function validarNombre(nombre) {
  if (!nombre || !nombre.trim()) {
    return 'El nombre es requerido y no puede estar vacío';
  }
  if (typeof nombre !== 'string'){
    return "El nombre debe ser un texto";
  }
   if (nombre.trim().length < 2 || nombre.trim().length > 100){
    return "El nombre debe tener entre 2 y 10 caracteres";
  }
  return null;
}

export function validarEmail(email) {
  if (!email) {
    return 'El email es requerido';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'El formato del email es inválido';
  }
  return null;
}

export function validarPost({ title, content, author_id }) {
  if (!title || typeof title !== 'string' || !title.trim()) {
    return 'El título es requerido';
  }
  if (!content || typeof content !== 'string' || !content.trim()) {
    return 'El contenido es requerido';
  }
  if (!author_id) {
    return 'El author_id es requerido';
  }
  if (typeof author_id !== 'number' || isNaN(author_id)) {
    return 'El author_id debe ser un número';
  }
  return null;
}