import express from "express";
import userRouter from "./routes/userRoutes.js";
import userApiRouter from "./routes/userApiRoutes.js";
import authRouter from "./routes/authRoutes.js";
import articleRouter from "./routes/articleRoutes.js";
import themeRouter from "./routes/themeRoutes.js";
import testRouter from "./routes/testRoutes.js";
import { logRequests, errorHandler } from "./middleware/middleware.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

const port = 3000;

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(logRequests);

app.get("/", (req, res) => {
  res.send("Home page - Express.js!");
});

// For study
app.use("/users", userRouter);
app.use("/articles", articleRouter);

// Real project
app.use("/api/users", authMiddleware, userApiRouter);
app.use("/api/auth", authRouter);
app.use("/api/theme", themeRouter);
app.use("/api/test", testRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Сервер запущений за адресою http://localhost:${port}`);
});
