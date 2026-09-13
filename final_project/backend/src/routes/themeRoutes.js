import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const theme = req.cookies.theme ?? "light";
  res.status(200).json({
    theme,
  });
});

router.post("/", (req, res) => {
  const { theme } = req.body;

  if (theme !== "light" && theme !== "dark") {
    return res.status(400).json({
      message: "Invalid theme",
    });
  }

  res.cookie("theme", theme, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  res.status(200).json({
    theme,
  });
});

export default router;
