// For testing
import express from "express";
import jwt from "jsonwebtoken";

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

export default router;
