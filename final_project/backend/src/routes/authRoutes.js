import express from "express";
import jwt from "jsonwebtoken";
import { registerUser, findUserByEmail } from "../services/userService.js";
import { configDotenv } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import passport from "passport";

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
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
}

router.post("/register", (req, res, next) => {
  try {
    const { login, email, password } = req.body;

    const existingUser = findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const newUser = registerUser(login, email, password);

    const token = generateToken(newUser);

    res.cookie("token", token, { httpOnly: true, maxAge: COOKIE_1_HR });

    res.status(201).json({
      id: newUser.id,
      login: newUser.login,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({
    id: req.user.id,
    login: req.user.login,
    email: req.user.email,
  });
});

router.post("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie("connect.sid");

      res.status(200).json({
        message: "Logged out successfully",
      });
    });
  });
});

export default router;
