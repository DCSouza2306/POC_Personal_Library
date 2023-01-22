import { book } from "../protocols.js";
import booksRepository from "../repository/books-repository.js";
import { notFoundError } from "../errors/not-found-error.js";

async function postBook(book: book){
    try{    
        const publishCompany = await booksRepository.getPublishingCompId(book.publishCompany);
        if(publishCompany.rowCount == 0){
            throw notFoundError("Can not found publishing company")
        };
        const compId = publishCompany.rows[0].id;

        const author = await booksRepository.getAuthorId(book.authors);
        if(author.rowCount == 0){
            throw notFoundError("Can not found author")
        };
        const authorId = author.rows[0].id;

        await booksRepository.insertBook(book, compId);

        const insertedBook = await booksRepository.getBooks();

        const bookId = insertedBook.rows[insertedBook.rowCount - 1].id

        await booksRepository.insertAuthorBook(bookId, authorId);

    } catch(error){
        throw error
    }
}

const booksService = {
    postBook
}

export default booksService