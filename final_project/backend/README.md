# Final Project Backend

Backend API for the `final_project` application. The server is built with **Node.js**, **Express.js**, **MongoDB Atlas**, and **Mongoose**.

This README describes the main backend routes, how they work with MongoDB data, and provides example requests and responses.

## Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Passport.js
- express-session
- dotenv

## Running the backend

Install dependencies:

```bash
npm install
```

Run the server in development mode:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

MongoDB connection data is stored in environment variables and should not be committed to Git.

Example:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
NODE_ENV=dev
```

---

# Item routes

The main item routes are mounted under:

```text
/api/items
```

The database logic is implemented through the Mongoose `Item` model and service functions.

## Route overview

| HTTP method | Route                         | Database operation    | Description                          |
| ----------- | ----------------------------- | --------------------- | ------------------------------------ |
| GET         | `/api/items`                  | `find()` + projection | Get all items without omitted fields |
| GET         | `/api/items/:id`              | `findById()`          | Get one item                         |
| POST        | `/api/items`                  | `create()`            | Create one item                      |
| POST        | `/api/test/create-test-items` | `insertMany()`        | Insert multiple test items           |
| PATCH       | `/api/items/:id`              | `findByIdAndUpdate()` | Update one item                      |
| PATCH       | `/api/items/availability`     | `updateMany()`        | Update multiple matching items       |
| DELETE      | `/api/items/:id`              | `findByIdAndDelete()` | Delete one item                      |
| DELETE      | `/api/items/delete-all-items` | `deleteMany()`        | Delete all items                     |

---

# 1. Read all items

## `GET /api/items`

Returns all item documents using projection so that only the fields needed by the frontend are returned.

The service uses:

```js
Item.find().select("-description");
```

Projection allows the API to control which fields are included in the response.

### Example request

```http
GET http://localhost:3000/api/items
```

### Example response

```json
[
  {
    "id": "68cf1234567890abcdef1234",
    "name": "Базова футболка",
    "price": 799,
    "discount": 0,
    "availability": "In stock",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Black", "White"],
    "image": ""
  }
]
```

Expected status:

```text
200 OK
```

---

# 2. Read one item

## `GET /api/items/:id`

Finds one item by its document ID.

The service uses:

```js
Item.findById(id);
```

### Example request

```http
GET http://localhost:3000/api/items/68cf1234567890abcdef1234
```

### Example response

```json
{
  "id": "68cf1234567890abcdef1234",
  "name": "Базова футболка",
  "description": "Бавовняна базова футболка прямого крою",
  "price": 799,
  "discount": 0,
  "availability": "In stock",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black", "White"],
  "image": ""
}
```

Expected status:

```text
200 OK
```

If the item does not exist, the service returns an error that is passed to the error-handling middleware.

---

# 3. Create one item

## `POST /api/items`

Creates a new document in the `items` collection.

The service uses:

```js
Item.create(itemData);
```

### Example request

```http
POST http://localhost:3000/api/items
Content-Type: application/json
```

```json
{
  "name": "Нова футболка",
  "description": "Базова бавовняна футболка",
  "price": 799,
  "discount": 10,
  "availability": "In stock",
  "sizes": ["S", "M", "L"],
  "colors": ["Black", "White"],
  "image": ""
}
```

### Example response

```json
{
  "id": "68cf1234567890abcdef9999",
  "name": "Нова футболка",
  "description": "Базова бавовняна футболка",
  "price": 799,
  "discount": 10,
  "availability": "In stock",
  "sizes": ["S", "M", "L"],
  "colors": ["Black", "White"],
  "image": ""
}
```

Expected status:

```text
201 Created
```

Required fields are validated by the Mongoose schema.

---

# 4. Create many test items

## `POST /api/test/create-test-items`

Creates multiple test documents at once.

The service reads data from the local test-data JSON file and inserts all documents with:

```js
Item.insertMany(testItemsList);
```

### Example request

```http
POST http://localhost:3000/api/test/create-test-items
```

No request body is required because the documents are loaded from the local test-data JSON file.

### Example response

```json
[
  {
    "id": "68cf1234567890abcdef1001",
    "name": "Базова футболка",
    "price": 799,
    "availability": "In stock"
  },
  {
    "id": "68cf1234567890abcdef1002",
    "name": "Оверсайз футболка",
    "price": 999,
    "availability": "In stock"
  }
]
```

Expected status:

```text
201 Created
```

This route is intended for development and test data.

---

# 5. Update one item

## `PATCH /api/items/:id`

Updates one existing item.

The service uses:

```js
Item.findByIdAndUpdate(id, itemData, {
  new: true,
  runValidators: true,
});
```

`new: true` returns the updated document, while `runValidators: true` applies schema validation to the update.

### Example request

```http
PATCH http://localhost:3000/api/items/68cf1234567890abcdef1234
Content-Type: application/json
```

```json
{
  "price": 899,
  "discount": 15,
  "availability": "In stock"
}
```

### Example response

```json
{
  "id": "68cf1234567890abcdef1234",
  "name": "Базова футболка",
  "description": "Бавовняна базова футболка прямого крою",
  "price": 899,
  "discount": 15,
  "availability": "In stock",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black", "White"],
  "image": ""
}
```

Expected status:

```text
200 OK
```

---

# 6. Update many items

## `PATCH /api/items/availability`

Updates every item that matches the provided availability value.

The service uses:

```js
Item.updateMany(
  {
    availability: currentAvailability,
  },
  {
    $set: {
      availability: newAvailability,
    },
  },
);
```

### Example request

```http
PATCH http://localhost:3000/api/items/availability
Content-Type: application/json
```

```json
{
  "currentAvailability": "Preorder",
  "newAvailability": "In stock"
}
```

### Example response

```json
{
  "acknowledged": true,
  "matchedCount": 3,
  "modifiedCount": 3
}
```

- `matchedCount` - number of documents matching the filter.
- `modifiedCount` - number of documents that were actually changed.

Expected status:

```text
200 OK
```

---

# 7. Delete one item

## `DELETE /api/items/:id`

Deletes one item by its document ID.

The service uses:

```js
Item.findByIdAndDelete(id);
```

### Example request

```http
DELETE http://localhost:3000/api/items/68cf1234567890abcdef1234
```

### Example response

Depending on the route implementation, the API can return the deleted document or an empty response.

Example:

```json
{
  "id": "68cf1234567890abcdef1234",
  "name": "Базова футболка",
  "price": 899,
  "availability": "In stock"
}
```

---

# 8. Delete all items

## `DELETE /api/items/delete-all-items`

Deletes all documents from the `items` collection.

The service uses:

```js
Item.deleteMany({});
```

The empty filter matches every document in the collection.

### Example request

```http
DELETE http://localhost:3000/api/items/delete-all-items
```

### Expected response

```text
204 No Content
```

After the operation:

```http
GET http://localhost:3000/api/items
```

returns:

```json
[]
```

---

# User routes

User routes are mounted under:

```text
/api/users
```

## Route overview

| HTTP method | Route            | Database operation         |
| ----------- | ---------------- | -------------------------- |
| GET         | `/api/users`     | `User.find()`              |
| GET         | `/api/users/:id` | `User.findById()`          |
| PATCH       | `/api/users/:id` | `User.findByIdAndUpdate()` |
| DELETE      | `/api/users/:id` | `User.findByIdAndDelete()` |

### Example request

```http
GET http://localhost:3000/api/users
```

### Example response

```json
[
  {
    "id": "68cf1234567890abcdef2001",
    "login": "tony_stark",
    "email": "tony_stark@example.com"
  }
]
```

---

# Test-data seeding

The project contains a seed script for restoring test data in MongoDB.

The seed process:

1. Connects to MongoDB.
2. Reads test users and test items from JSON files.
3. Removes existing test data with `deleteMany({})`.
4. Inserts test documents with `insertMany()`.

Run it from the backend directory:

```bash
npm run seed
```

The seed script is intended for local development and testing. Can only be run if the local variable is set to dev: NODE_ENV = "dev".

---

# Error handling

Asynchronous route handlers pass errors to Express error-handling middleware using:

```js
next(error);
```

Typical service errors include:

```text
Item not found
User not found
Item already exists
User already exists
```

---

# Project structure

The backend follows a service-based structure:

```text
src/
├── config/
├── data/
├── middleware/
├── models/
├── routes/
├── services/
└── server.js
```

- `models` - Mongoose schemas and models.
- `services` - database operations and business logic.
- `routes` - HTTP endpoints.
- `middleware` - shared Express middleware.
- `data` - local test data used by development scripts.

---

# Summary

The backend supports:

- reading item and user data;
- creating single items;
- inserting multiple test documents;
- updating individual items;
- updating multiple items by filter;
- deleting individual items;
- deleting all items;
- field projection for item lists;
- test-data seeding.
