import express from "express";
import jwt from "jsonwebtoken";
import { readAllUsers, registerUser, findUserByLogin } from "../services/userService.js";
import { configDotenv } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
configDotenv({ path: path.resolve(__dirname, "../../.env") });

const COOKIE_1_HR = 1000 * 60 * 60;

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      login: user.login,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
}

router.post("/register", (req, res, next) => {
  try {
    const { login, password } = req.body;

    const users = readAllUsers();

    const existingUser = users.find((user) => user.login === login);

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const newUser = registerUser(login, password);

    const token = generateToken(newUser);

    res.cookie("token", token, { httpOnly: true, maxAge: COOKIE_1_HR });

    res.status(201).json({
      id: newUser.id,
      login: newUser.login,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", (req, res, next) => {
  try {
    const { login, password } = req.body;

    const user = findUserByLogin(login);

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid login or password",
      });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: COOKIE_1_HR,
    });

    res.status(200).json({
      id: user.id,
      login: user.login,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
