import "dotenv/config";

import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";

import chalk from "chalk";

import { connectDatabase } from "./config/database.js";

import userRouter from "./routes/userRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import authRouter from "./routes/authRoutes.js";
import themeRouter from "./routes/themeRoutes.js";
import testRouter from "./routes/testRoutes.js";

import { logRequests, errorHandler } from "./middleware/middleware.js";

import { ensureAuthenticated } from "./middleware/authMiddleware.js";
import helmet from "helmet";

const app = express();

await connectDatabase();

const port = 3000;

// Helmet
app.use(helmet());

// General
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  res.json({ message: "API is running" });
});

// Authentication
app.use("/api/auth", authRouter);

// Main routes
// app.use("/api/users", ensureAuthenticated, userRouter);
app.use("/api/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/theme", themeRouter);

// Test routes
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
  console.log(`${chalk.green("Server started at:")} ${chalk.cyan(`http://localhost:${port}`)}`);
});
