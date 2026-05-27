function validatePassword(password) {
  const errors = [];

  if (!password || typeof password !== "string") {
    errors.push("La password es obligatoria");
    return {
      valid: false,
      errors
    };
  }

  if (password.length < 8) {
    errors.push("Debe tener al menos 8 caracteres");
  }

  if (password.length > 30) {
    errors.push("Debe tener como maximo 30 caracteres");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Debe tener al menos una mayuscula");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Debe tener al menos un numero");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = validatePassword;