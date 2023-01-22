import { Router } from "express";
import { postNewBook } from "../controller/books-controller.js";
import { bookSchema } from "../models/book-schema.js";
import { schemaValidation } from "../middleware/book-validation-middleware.js";

const routerBook = Router();

routerBook.post("/",schemaValidation(bookSchema), postNewBook);


export default routerBook;