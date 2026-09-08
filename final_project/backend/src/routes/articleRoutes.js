import express from "express";
import { readAllArticles, findArticle } from "../services/articleService.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    const articles = readAllArticles();

    res.status(200).render("articles.ejs", {
      articles,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);

    const article = findArticle(id);

    res.status(200).render("article.ejs", {
      article,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
