const request = require("supertest");
const app = require("../src/app");

describe("POST /validate-password", () => {
  test("Debe aceptar una password valida", async () => {
    const response = await request(app)
      .post("/validate-password")
      .send({
        password: "Hola1234"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      valid: true,
      message: "Password valida"
    });
  });

  test("Debe rechazar una password sin mayuscula", async () => {
    const response = await request(app)
      .post("/validate-password")
      .send({
        password: "hola1234"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.valid).toBe(false);
    expect(response.body.errors).toContain("Debe tener al menos una mayuscula");
  });

  test("Debe rechazar una password sin numero", async () => {
    const response = await request(app)
      .post("/validate-password")
      .send({
        password: "HolaMundo"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.valid).toBe(false);
    expect(response.body.errors).toContain("Debe tener al menos un numero");
  });

  test("Debe rechazar una password menor a 8 caracteres", async () => {
    const response = await request(app)
      .post("/validate-password")
      .send({
        password: "Hola1"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.valid).toBe(false);
    expect(response.body.errors).toContain("Debe tener al menos 8 caracteres");
  });
});