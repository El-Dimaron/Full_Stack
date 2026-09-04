import express from "express";
import { readAllUsers, registerUser, findUser, updateUser, deleteUser } from "./userService.js";
import { basicAuth, validateUserInput } from "./middleware.js";
import { createTestUsers } from "./userService.js"; // For testing
import { configDotenv } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
configDotenv({ path: path.resolve(__dirname, "../.env") });

const router = express.Router();

router.get("/", (req, resp) => {
  try {
    const users = readAllUsers();

    resp.status(200).render("users", { users });
  } catch (err) {
    console.error(err);
    resp.status(500).json("Internal server error");
  }
});

router.get("/nude-ryan-gosling", basicAuth, async (req, res) => {
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

router.get("/:id", (req, resp) => {
  try {
    const id = Number.parseInt(req.params.id);

    const user = findUser(id);

    resp.status(200).render("user", {
      user,
    });
  } catch (err) {
    if (err.message === "User not found") {
      return resp.status(404).send("User not found");
    }

    resp.status(500).send("Internal server error");
  }
});

router.post("/", validateUserInput, (req, resp) => {
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
