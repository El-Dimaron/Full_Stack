import * as fs from "node:fs";
import path from "node:path";

const DB_PATH = new URL("../data/users.json", import.meta.url);

function readUsers() {
  const isDBExist = fs.existsSync(DB_PATH);

  if (!isDBExist) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

    saveUsers([]);
    return [];
  }

  const usersList = fs.readFileSync(DB_PATH, "utf-8");

  if (!usersList.trim()) {
    return [];
  }

  return JSON.parse(usersList);
}

function saveUsers(users) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

export function readAllUsers() {
  const usersList = readUsers();

  return usersList.map((user) => ({ id: user.id, login: user.login }));
}

export function registerUser(login, password) {
  const users = readUsers();

  const isUserExist = users.some((user) => user.login === login);

  if (isUserExist) {
    throw new Error("User already exists");
  }

  const lastUser = users.at(-1);

  const currentId = lastUser ? Number.parseInt(lastUser.id) + 1 : 1;

  const newUser = {
    id: currentId,
    login,
    password,
  };

  users.push(newUser);

  saveUsers(users);

  return newUser;
}

export function findUser(id, index = false) {
  const users = readUsers();

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  const user = users[userIndex];

  if (!index) {
    return user;
  }

  return {
    user,
    index: userIndex,
  };
}

export function updateUser(id, userData) {
  const { index } = findUser(id, true);
  const users = readUsers();

  const updatedUser = {
    id,
    ...userData,
  };

  users.splice(index, 1, updatedUser);
  saveUsers(users);
  return updatedUser;
}

export function deleteUser(id) {
  const { index } = findUser(id, true);
  const users = readUsers();

  const [deletedUser] = users.splice(index, 1);

  saveUsers(users);

  return deletedUser;
}

// For testing

export function createTestUsers() {
  const testUsersPath = path.resolve("data", "testUsers.json");

  const testUsersFile = fs.readFileSync(testUsersPath, "utf-8");

  const testUsersList = JSON.parse(testUsersFile);

  saveUsers(testUsersList);

  return testUsersList;
}
