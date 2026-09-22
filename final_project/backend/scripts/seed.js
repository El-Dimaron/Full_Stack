import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

import { connectDatabase } from "../src/config/database.js";
import User from "../src/models/User.js";
import Item from "../src/models/Item.js";

async function seed() {
  try {
    if (process.env.NODE_ENV !== "dev") {
      throw new Error("Not allowed");
    }

    await connectDatabase();

    // Users test samples

    const testUsersPath = path.resolve("src/data", "testUsers.json");

    const testUsersFile = fs.readFileSync(testUsersPath, "utf-8");
    const testUsersList = JSON.parse(testUsersFile);

    await User.deleteMany({});

    const createdUsers = await User.insertMany(testUsersList);

    console.log(`Created ${createdUsers.length} test users`);

    // Items test samples

    const testItemsPath = path.resolve("src/data", "testItems.json");

    const testItemsFile = fs.readFileSync(testItemsPath, "utf-8");
    const testItemsList = JSON.parse(testItemsFile);

    await Item.deleteMany({});

    const createdItems = await Item.insertMany(testItemsList);

    console.log(`Created ${createdItems.length} test items`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);

    process.exit(1);
  }
}

seed();
