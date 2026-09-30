import express from "express";
import {
  readAllItems,
  getItemsCursor,
  addItem,
  findItem,
  updateItem,
  deleteItem,
  resetAllDiscounts,
  updateItemsAvailability,
  getItemsStats,
} from "../services/itemService.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const items = await readAllItems();

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

router.get("/cursor", async (req, res, next) => {
  try {
    const cursor = getItemsCursor();

    res.status(200);
    res.setHeader("Content-Type", "application/json");

    res.write("[");

    let isFirstItem = true;

    for await (const item of cursor) {
      if (!isFirstItem) {
        res.write(",");
      }

      res.write(JSON.stringify(item));

      isFirstItem = false;
    }
    res.write("]");
    res.end();
  } catch (error) {
    next(error);
  }
});

router.get("/stats", async (req, res, next) => {
  try {
    const stats = await getItemsStats();

    res.status(200).json(stats);
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

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const { name, description, price, discount, availability, sizes, colors } = req.body;

    const image = req.file ? `/uploads/items/${req.file.filename}` : "";

    const newItem = await addItem({
      name,
      description,
      price: Number(price),
      discount: Number(discount),
      availability,
      sizes: JSON.parse(sizes),
      colors: JSON.parse(colors),
      image,
    });

    res.status(201).json(newItem);
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

router.patch("/:id", upload.single("image"), async (req, res, next) => {
  try {
    const itemData = {
      ...req.body,

      price: Number(req.body.price),
      discount: Number(req.body.discount),

      sizes: JSON.parse(req.body.sizes),
      colors: JSON.parse(req.body.colors),
    };

    if (req.file) {
      itemData.image = `/uploads/items/${req.file.filename}`;
    }

    const updatedItem = await updateItem(req.params.id, itemData);

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

export default router;
