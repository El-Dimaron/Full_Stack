import Item from "../models/Item.js";

export async function readAllItems() {
  return Item.find();
}

export async function readItemsSummaries() {
  return Item.find().select("-description");
}

export async function addItem(itemData) {
  const existingItem = await Item.findOne({
    name: itemData.name,
  });

  if (existingItem) {
    throw new Error("Item already exists");
  }

  return Item.create(itemData);
}

export async function findItem(id) {
  const item = await Item.findById(id);

  if (!item) {
    throw new Error("Item not found");
  }

  return item;
}

export async function findItemByName(name) {
  return Item.findOne({ name });
}

export async function updateItem(id, itemData) {
  const item = await Item.findByIdAndUpdate(id, itemData, { new: true, runValidators: true });

  if (!item) {
    throw new Error("Item not found");
  }

  return item;
}

export async function deleteItem(id) {
  const item = await Item.findByIdAndDelete(id);

  if (!item) {
    throw new Error("Item not found");
  }

  return item;
}

export async function resetAllDiscounts() {
  return Item.updateMany(
    {},
    {
      $set: {
        discount: 0,
      },
    },
  );
}

export async function updateItemsAvailability(currentAvailability, newAvailability) {
  return Item.updateMany(
    { availability: currentAvailability },
    {
      $set: {
        availability: newAvailability,
      },
    },
  );
}
