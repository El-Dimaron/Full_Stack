// For testing
import express from "express";
import jwt from "jsonwebtoken";
import * as fs from "node:fs";
import path from "path";
import { saveUsers } from "../services/userService.js";

const router = express.Router();

const COOKIE_1_HR = 1000 * 60 * 60;

// Post test

router.post("/", (req, res) => {
  const body = req.body;

  res.status(200).json(body);
});

// Token

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

// Test Users

export function createTestUsers() {
  const testUsersPath = path.resolve("src/data", "testUsers.json");

  const testUsersFile = fs.readFileSync(testUsersPath, "utf-8");

  const testUsersList = JSON.parse(testUsersFile);

  saveUsers(testUsersList);

  return testUsersList;
}

router.post("/create-test-users", (req, res) => {
  const testUsers = createTestUsers();
  res.status(201).json(testUsers);
});

function deleteAllUsers() {
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
  deleteAllUsers();
  res.status(204).json([]);
});

// Easter egg

router.get("/nude-ryan-gosling", async (req, res) => {
  try {
    const apiKey = process.env.GIPHY_API_KEY;

    const staticGifURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=Ryan+Gosling&limit=1`;

    const randomGifURL = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=Ryan+Gosling`;

    const isRandom = req.body?.random === "true";

    const fetchURL = isRandom ? randomGifURL : staticGifURL;

    const giphyResponse = await fetch(fetchURL);

    const data = await giphyResponse.json();

    const gifUrl = isRandom ? data.data.images.original.url : data.data[0].images.original.url;

    const gifResponse = await fetch(gifUrl);

    const buffer = Buffer.from(await gifResponse.arrayBuffer());

    res.set("Content-Type", "image/gif");
    res.send(buffer);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch GIF",
    });
  }
});

export default router;
