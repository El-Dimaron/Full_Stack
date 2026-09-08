import express from "express";
import userRouter from "./routes/userRoutes.js";
import articleRouter from "./routes/articleRoutes.js";
import { logRequests, errorHandler } from "./middleware/middleware.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const port = 3000;

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(logRequests);

app.get("/", (req, resp) => {
  resp.send("Вітаємо на нашому першому сервері з використанням Express.js!");
});

app.use("/users", userRouter);
app.use("/articles", articleRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Сервер запущений за адресою http://localhost:${port}`);
});
