import express from "express";
import { readAllUsers, findUser, updateUser, deleteUser } from "../services/userService.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    const users = readAllUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const user = findUser(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const updatedUser = updateUser(id, req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const deletedUser = deleteUser(id);

    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
});

export default router;
