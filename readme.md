# 📚 Library Management Backend

A robust RESTful API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** to manage books and borrowing records in a library system.

---

## 🌐 Live Links

- **GitHub Repository:** [Library Management Backend]()
- **Live Deployment:** [Library Management API]()

---

## 🚀 Features

- **Books Management:** Add, update, delete, and retrieve books with availability tracking.
- **Borrowing System:** Borrow books, track quantities, and enforce availability rules.
- **Filtering & Sorting:** Flexible query parameters for filtering by genre, sorting, and limiting results but optional so if all books need to fetch without filtering then it can be done.
- **Error Handling:** Centralized error handling with custom `ApiError` for validation and runtime errors.
- **Aggregation Pipeline:** Efficient data aggregation for borrowed books summary and all books .
- **Vercel Deployment:** Fully optimized for serverless deployment on Vercel using vercel CLI.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript
- **Development Tools:** Nodemon, dotenv
- **Deployment:** Vercel (serverless functions)

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone 
cd 
npm install
```

### ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=
PORT=
NODE_ENV=

```

---

## 📘 API Documentation

This API provides endpoints for managing books and borrowing records in a library system.

---

### 📚 Book Endpoints

#### ➕ Create a Book

- **Method:** `POST`
- **URL:** `/books`
- **Request Body:**

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "FANTASY",
  "isbn": "9780547928227",
  "description": "A fantasy novel set in Middle-earth.",
  "copies": 10
}
```

#### ✅ Successful Response

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "book_id",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "FANTASY",
    "isbn": "9780547928227",
    "description": "A fantasy novel set in Middle-earth.",
    "copies": 10,
    "available": true,
    "createdAt": "2025-06-22T05:07:17.261Z",
    "updatedAt": "2025-06-22T05:08:00.715Z"
  }
}
```

---

#### 🔍 Get All Books

- **Method:** `GET`
- **URL:** `/books`

##### Query Parameters (optional)

- `filter`: Filter by genre (`FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`)
- `sortBy`: Field to sort by (`createdAt`, `title`, `author`, etc.)
- `sort`: `asc` or `desc`
- `limit`: Number of results to return (default: `10`)

##### Example Request

```bash
/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```

#### ✅ Successful Response

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "book_id",
      "title": "A Brief History of Time",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An introduction to cosmology and the nature of the universe.",
      "copies": 6,
      "available": true,
      "createdAt": "2025-06-22T05:07:17.261Z",
      "updatedAt": "2025-06-22T05:08:00.715Z"
    }
  ]
}
```

---

#### 📕 Get a Book by ID

- **Method:** `GET`
- **URL:** `/books/:bookId`

#### ✅ Successful Response

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "book_id",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "FANTASY",
    "isbn": "9780547928227",
    "description": "A fantasy novel set in Middle-earth.",
    "copies": 10,
    "available": true,
    "createdAt": "2025-06-22T05:07:17.261Z",
    "updatedAt": "2025-06-22T05:08:00.715Z"
  }
}
```

---

#### 📝 Update a Book

- **Method:** `PATCH`
- **URL:** `/books/:bookId`
- **Request Body:** (any updatable fields)

```json
{
  "copies": 15
}
```

#### ✅ Successful Response

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "book_id",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "FANTASY",
    "isbn": "9780547928227",
    "description": "Updated description",
    "copies": 15,
    "available": true,
    "createdAt": "2025-06-22T05:07:17.261Z",
    "updatedAt": "2025-06-22T05:08:00.715Z"
  }
}
```

---

#### ❌ Delete a Book

- **Method:** `DELETE`
- **URL:** `/books/:bookId`

#### ✅ Response

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

---

### 📖 Borrow Endpoints

#### ➕ Borrow a Book

- **Method:** `POST`
- **URL:** `/borrow`

#### Request Body

```json
{
  "book": "book_id",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### ✅ Response

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "borrow_id",
    "book": "book_id",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-22T05:07:17.261Z",
    "updatedAt": "2025-06-22T05:08:00.715Z"
  }
}
```

---

#### 📖 Borrowed Books Summary

- **Method:** `GET`
- **URL:** `/borrow`

#### ✅ Response

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "bookTitle": "1984",
      "isbn": "9780451524935",
      "totalBorrowed": 15
    },
    {
      "bookTitle": "The Great Gatsby",
      "isbn": "9780743273565",
      "totalBorrowed": 9
    },
    {
      "bookTitle": "Pride and Prejudice",
      "isbn": "9780141439518",
      "totalBorrowed": 7
    }
  ]
}
```

---

## 🛠️ Deployment

### Local Development

```bash
npm run dev
```

### Production Deployment

```bash
vercel --prod
```