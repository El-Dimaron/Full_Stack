import express from "express";
import { readAllUsers, registerUser } from "../services/userService.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    const users = readAllUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { login, password } = req.body;

    const newUser = registerUser(login, password);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

export default router;
