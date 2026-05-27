const express = require("express");
const validatePassword = require("./passwordValidator");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de validacion de password con Integracion Continua"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.post("/validate-password", (req, res) => {
  const { password } = req.body || {};

  const result = validatePassword(password);

  if (!result.valid) {
    return res.status(400).json(result);
  }

  return res.status(200).json({
    valid: true,
    message: "Password valida"
  });
});

module.exports = app;