import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";

import userRouter from "./routes/userRoutes.js";
import userApiRouter from "./routes/userApiRoutes.js";
import authRouter from "./routes/authRoutes.js";
import articleRouter from "./routes/articleRoutes.js";
import themeRouter from "./routes/themeRoutes.js";
import testRouter from "./routes/testRoutes.js";

import { logRequests, errorHandler } from "./middleware/middleware.js";

import { ensureAuthenticated } from "./middleware/authMiddleware.js";

const app = express();

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// For study

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// General

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

// Sessions

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// Passport

app.use(passport.initialize());
app.use(passport.session());

// Logging

app.use(logRequests);

// Home

app.get("/", (req, res) => {
  res.send("Home page - Express.js!");
});

// For study

app.use("/users", userRouter);
app.use("/articles", articleRouter);

// Authentication

app.use("/api/auth", authRouter);

// Real project

app.use("/api/users", ensureAuthenticated, userApiRouter);
app.use("/api/theme", themeRouter);
app.use("/api/test", testRouter);

// For study (passport protected route)

app.get("/protected", ensureAuthenticated, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

// Error handler

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Сервер запущений за адресою http://localhost:${port}`);
});
