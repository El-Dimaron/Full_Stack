import express from "express";
import { readAllItems, addItem, findItem, updateItem, deleteItem } from "../services/itemService.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const items = await readAllItems();

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await findItem(id);

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description, price, discount, availability, sizes, colors, image } = req.body;

    const newItem = await addItem({
      name,
      description,
      price,
      discount,
      availability,
      sizes,
      colors,
      image,
    });

    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedItem = updateItem(id, req.body);

    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedItem = deleteItem(id);

    res.status(200).json(deletedItem);
  } catch (error) {
    next(error);
  }
});

export default router;
