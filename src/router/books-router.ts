import { Router } from "express";
import { 
    postNewBook,
    getBooks, 
    updateBook, 
    deleteBook, 
    getBookByAuthor, 
    postAuthor,
    postPublishingCompany
} from "../controller/books-controller.js";
import { bookSchema } from "../models/book-schema.js";
import { schemaValidation } from "../middleware/book-validation-middleware.js";
import { authorSchema } from "../models/author-schema.js";
import { publishingCompanySchema } from "../models/publishing-company-schema.js";

const routerBook = Router();

routerBook.post("/", schemaValidation(bookSchema), postNewBook);
routerBook.get("/", getBooks);
routerBook.patch("/:id", schemaValidation(bookSchema), updateBook);
routerBook.delete("/:id", deleteBook);
routerBook.get("/author/:id", getBookByAuthor);
routerBook.post("/author", schemaValidation(authorSchema), postAuthor);
routerBook.post("/company", schemaValidation(publishingCompanySchema), postPublishingCompany)


export default routerBook;