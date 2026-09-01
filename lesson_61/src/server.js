import express from "express";
import userRouter from "./userRoutes.js";
import { logRequests } from "./middleware.js";

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logRequests);

app.get("/", (req, resp) => {
  resp.send("Вітаємо на нашому першому сервері з використанням Express.js!");
});

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Сервер запущений за адресою http://localhost:${port}`);
});
