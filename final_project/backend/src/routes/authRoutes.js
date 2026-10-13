import express from "express";
import { findUserByEmail, findUserByLogin, registerUser } from "../services/userService.js";
import passport from "passport";
import { validateLogin, validateEmail, validatePassword } from "../utils/validation.js";

const router = express.Router();

router.get("/me", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  res.status(200).json({
    id: req.user.id,
    login: req.user.login,
    email: req.user.email,
  });
});

router.post("/register", async (req, res, next) => {
  try {
    // const { login, email, password } = req.body;

    const login = req.body.login?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!login || !email || !password) {
      return res.status(400).json({
        message: "Login, email and password are required",
      });
    }

    const loginError = validateLogin(login);

    if (loginError) {
      return res.status(400).json({
        message: loginError,
      });
    }

    const emailError = validateEmail(email);

    if (emailError) {
      return res.status(400).json({
        message: emailError,
      });
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
      return res.status(400).json({
        message: passwordError,
      });
    }

    const existingUserByEmail = await findUserByEmail(email);

    if (existingUserByEmail) {
      return res.status(409).json({
        message: "Юзер з таким email вже існує",
      });
    }

    const existingUserByLogin = await findUserByLogin(login);

    if (existingUserByLogin) {
      return res.status(409).json({
        message: "Юзер з таким логіном вже існує",
      });
    }

    const newUser = await registerUser(login, email, password);

    req.login(newUser, (error) => {
      if (error) {
        return next(error);
      }
      res.status(201).json({
        id: newUser.id,
        login: newUser.login,
        email: newUser.email,
      });
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({
    id: req.user.id,
    login: req.user.login,
    email: req.user.email,
  });
});

router.get("/check-availability", async (req, res, next) => {
  try {
    const { login, email } = req.query;

    const result = {
      loginAvailable: true,
      emailAvailable: true,
    };

    if (login) {
      const user = await findUserByLogin(login);

      result.loginAvailable = !user;
    }

    if (email) {
      const user = await findUserByEmail(email);

      result.emailAvailable = !user;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie("connect.sid");

      res.status(200).json({
        message: "Logged out successfully",
      });
    });
  });
});

export default router;
