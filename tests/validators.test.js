// test/validators.test.js
import { describe, test, expect } from "vitest";
import { validarNombre, validarEmail, validarPost } from "../src/utils/validators.js";

describe("Pruebas unitarias para validators.js", () => {
  // Test 1: validarNombre - Caso inválido (vacío o espacios)
  test("validarNombre debe retornar un error si el nombre está vacío o tiene solo espacios", () => {
    const result = validarNombre("   ");
    expect(result).toBe("El nombre es requerido y no puede estar vacío");
  });

  // Test 2: validarNombre - Caso válido
  test("validarNombre debe retornar null cuando el nombre es válido", () => {
    const result = validarNombre("Angélica");
    expect(result).toBeNull();
  });

  // Test 3: validarEmail - Caso inválido (sin @ o dominio)
  test("validarEmail debe retornar un error si el formato del email es inválido", () => {
    const result = validarEmail("correo-sin-arroba.com");
    expect(result).toBe("El formato del email es inválido");
  });

  // Test 4: validarEmail - Caso válido
  test("validarEmail debe retornar null cuando el email tiene un formato correcto", () => {
    const result = validarEmail("angelica@ejemplo.com");
    expect(result).toBeNull();
  });

  // Test 5: validarPost - Caso inválido (author_id como string en lugar de número)
  test("validarPost debe retornar un error si el author_id no es un número", () => {
    const result = validarPost({
      title: "Mi proyecto Full Stack",
      content: "Contenido del post",
      author_id: "1", // Pasado como string intencionalmente
    });
    expect(result).toBe("El author_id debe ser un número");
  });

  // Test 6: validarPost - Caso válido
  test("validarPost debe retornar null cuando todos los campos del post son válidos", () => {
    const result = validarPost({
      title: "Mi proyecto Full Stack",
      content: "Contenido del post",
      author_id: 1, // Número válido
    });
    expect(result).toBeNull();
  });
});
