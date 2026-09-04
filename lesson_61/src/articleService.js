import * as fs from "node:fs";
import path from "node:path";

const DB_PATH = path.resolve("data", "articles.json");

function readArticles() {
  const isDBExist = fs.existsSync(DB_PATH);

  if (!isDBExist) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

    saveArticles([]);
    return [];
  }

  const articlesList = fs.readFileSync(DB_PATH, "utf-8");

  if (!articlesList.trim()) {
    return [];
  }

  return JSON.parse(articlesList);
}

function saveArticles(articles) {
  fs.writeFileSync(DB_PATH, JSON.stringify(articles, null, 2));
}

export function readAllArticles() {
  return readArticles();
}

export function findArticle(id) {
  const articles = readArticles();

  const article = articles.find((article) => article.id === id);

  if (!article) {
    throw new Error("Article not found");
  }

  return article;
}
