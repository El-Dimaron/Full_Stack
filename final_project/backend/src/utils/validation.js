export function validateLogin(login) {
  const normalizedLogin = login.trim();

  if (normalizedLogin.length < 3) {
    return "Login must contain at least 3 characters";
  }

  if (normalizedLogin.length > 30) {
    return "Login cannot contain more than 30 characters";
  }

  if (!/^[A-Za-z0-9._-]+$/.test(normalizedLogin)) {
    return "Login can contain only Latin letters, numbers, ., _ and -";
  }

  return null;
}

export function validateEmail(email) {
  const normalizedEmail = email.trim();

  if (normalizedEmail.length > 254) {
    return "Email cannot contain more than 254 characters";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return "Invalid email";
  }

  return null;
}

export function validatePassword(password) {
  if (password.length < 8) {
    return "Password must contain at least 8 characters";
  }

  if (password.length > 72) {
    return "Password cannot contain more than 72 characters";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one digit";
  }

  return null;
}
