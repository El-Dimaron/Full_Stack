// For testing
import express from "express";
import jwt from "jsonwebtoken";
import * as fs from "node:fs";

const router = express.Router();

const COOKIE_1_HR = 1000 * 60 * 60;

router.get("/get-token", (req, res) => {
  if (process.env.NODE_ENV !== "dev") {
    return res.sendStatus(404);
  }

  const token = jwt.sign({ id: 1, login: "test-user" }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: COOKIE_1_HR,
  });

  res.status(200).json({
    message: "Cookie successfully generated",
  });
});

function DeleteAllUsers() {
  const DB_PATH = new URL("../data/users.json", import.meta.url);

  if (process.env.NODE_ENV !== "dev") {
    return res.sendStatus(404);
  }
  const isDBExist = fs.existsSync(DB_PATH);

  if (!isDBExist) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  }

  fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));

  return [];
}

router.delete("/delete-all-users", (req, res) => {
  DeleteAllUsers();
  res.status(204).json([]);
});

export default router;
