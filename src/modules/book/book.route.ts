import { Router } from "express";
import { bookController } from "./book.controller";

const bookRoute = Router();

bookRoute.post("/", bookController.createBook);
bookRoute.get("/:bookId", bookController.getBookById);
bookRoute.patch("/:bookId", bookController.updateBook);
bookRoute.delete("/:bookId", bookController.deleteBook);
bookRoute.get("/", bookController.getBooks);

export default bookRoute;