import express from "express";
import {
  readItemsSummaries,
  addItem,
  findItem,
  updateItem,
  deleteItem,
  resetAllDiscounts,
  updateItemsAvailability,
} from "../services/itemService.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const items = await readItemsSummaries();

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

router.patch("/reset-discounts", async (req, res, next) => {
  try {
    const result = await resetAllDiscounts();

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/availability", async (req, res, next) => {
  try {
    const { currentAvailability, newAvailability } = req.body;

    const result = await updateItemsAvailability(currentAvailability, newAvailability);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
