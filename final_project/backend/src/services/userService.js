import User from "../models/User.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/auth.js";

export async function readAllUsers() {
  return User.find().select("login email");
}

export async function registerUser(login, email, password) {
  const existingUser = await User.findOne({
    $or: [{ login }, { email }],
  });

  if (existingUser) {
    throw new Error("Юзер вже існує");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return User.create({
    login,
    email,
    password: hashedPassword,
  });
}

export async function findUser(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function findUserByEmail(email) {
  return User.findOne({ email });
}

export async function findUserByEmailOrLogin(identifier) {
  const normalizedIdentifier = identifier.trim();

  return User.findOne({
    $or: [{ email: identifier }, { login: identifier }],
  });
}

export async function findUserByLogin(login) {
  return User.findOne({ login });
}

export async function updateUser(id, userData) {
  const user = await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function deleteUser(id) {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
