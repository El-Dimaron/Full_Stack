import path from "path";
import fs from "fs";

const DB_PATH = path.resolve("data", "users.json");

async function readUsers() {
  try {
    const isDBExist = fs.existsSync(DB_PATH);

    if (!isDBExist) {
      await fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

      saveUsers([]);
      return [];
    }

    const usersList = await fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(usersList);
  } catch (error) {
    throw new Error(error);
  }
}

async function saveUsers(users) {
  await fs.writeFileSync(DB_PATH, JSON.stringify(users));
}

async function readAllUsers() {
  const usersList = await readUsers();

  if (usersList.length === 0) {
    console.log("No users yet");
    return;
  }

  return usersList.map((user) => ({ id: user.id, login: user.login }));
}

export async function registerUser(login, password) {
  const users = await readUsers();

  const isUserExist = users.some((user) => user.login === login);

  if (isUserExist) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: Date.now().toString(),
    login,
    password,
  };

  users.push(newUser);

  await saveUsers(users);

  return newUser;
}
