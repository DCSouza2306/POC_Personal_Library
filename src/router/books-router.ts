import { Router } from "express";
import { postNewBook, getBooks, updateBook } from "../controller/books-controller.js";
import { bookSchema } from "../models/book-schema.js";
import { schemaValidation } from "../middleware/book-validation-middleware.js";

const routerBook = Router();

routerBook.post("/", schemaValidation(bookSchema), postNewBook);
routerBook.get("/", getBooks);
routerBook.patch("/:id", schemaValidation(bookSchema), updateBook)


export default routerBook;