import User from "../models/User.js";

export async function readAllUsers() {
  return User.find().select("login email");
}

export async function registerUser(login, email, password) {
  const existingUser = await User.findOne({
    $or: [{ login }, { email }],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  return User.create({
    login,
    email,
    password,
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
