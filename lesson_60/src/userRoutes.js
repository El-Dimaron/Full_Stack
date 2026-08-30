import express from "express";
import { readAllUsers, registerUser, findUser, updateUser, deleteUser } from "./userService.js";
import { createTestUsers } from "./userService.js"; // For testing

const router = express.Router();

router.get("/", (req, resp) => {
  try {
    const users = readAllUsers();

    resp.status(200).json(users);
  } catch {
    resp.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/:id", (req, resp) => {
  try {
    const id = Number.parseInt(req.params.id);

    const user = findUser(id);

    resp.status(200).json(user);
  } catch (err) {
    if (err.message === "User not found") {
      return resp.status(404).json({
        error: "User not found",
      });
    }

    resp.status(500).json({
      error: "Internal server error",
    });
  }
});

router.post("/", (req, resp) => {
  try {
    const { login, password } = req.body;

    const newUser = registerUser(login, password);

    resp.status(201).json(newUser);
  } catch (err) {
    if (err.message === "User already exists") {
      return resp.status(409).json({
        error: "User already exists",
      });
    }

    resp.status(500).json({
      error: "Internal server error",
    });
  }
});

router.put("/:id", (req, resp) => {
  try {
    const id = Number.parseInt(req.params.id);
    const { login, password } = req.body;

    const updatedUser = updateUser(id, {
      login,
      password,
    });

    resp.status(200).json(updatedUser);
  } catch (err) {
    if (err.message === "User not found") {
      return resp.status(404).json({
        error: "User not found",
      });
    }

    resp.status(500).json({
      error: "Internal server error",
    });
  }
});

router.delete("/:id", (req, resp) => {
  try {
    const id = Number.parseInt(req.params.id);

    const deletedUser = deleteUser(id);

    resp.status(200).json(deletedUser);
  } catch (err) {
    if (err.message === "User not found") {
      return resp.status(404).json({
        error: "User not found",
      });
    }

    resp.status(500).json({
      error: "Internal server error",
    });
  }
});

// For testing

router.post("/test", (req, resp) => {
  const body = req.body;

  resp.status(200).json(body);
});

router.post("/create-test-users", (req, resp) => {
  const testUsers = createTestUsers();
  resp.status(201).json(testUsers);
});

export default router;
