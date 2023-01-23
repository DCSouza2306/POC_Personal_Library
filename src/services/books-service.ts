import { book } from "../protocols.js";
import booksRepository from "../repository/books-repository.js";
import { notFoundError } from "../errors/not-found-error.js";
import { conflictError } from "../errors/conflict-error.js";

async function postBook(book: book){
    try{    
        const publishCompany = await booksRepository.getPublishingCompId(book.publishCompany);
        if(publishCompany.rowCount == 0){
            throw notFoundError("Can not found publishing company")
        };
        const compId = publishCompany.rows[0].id;

        const author = await booksRepository.getAuthorId(book.author);
        if(author.rowCount == 0){
            throw notFoundError("Can not found author")
        };
        const authorId = author.rows[0].id;

        await booksRepository.insertBook(book, compId, authorId);


    } catch(error){
        throw error
    }
}

async function getBooks(name: string){
    try{
        if(name == undefined){
            return await booksRepository.getBooks();
        } else {
            return await booksRepository.getBooksByName(name);
        }
    } catch(error) {
        throw error
    }
}

async function updateBook(book: book, id: number){
    try{
        const publishCompany = await booksRepository.getPublishingCompId(book.publishCompany);
        if(publishCompany.rowCount == 0){
            throw notFoundError("Can not found publishing company")
        };
        const compId = publishCompany.rows[0].id;

        const author = await booksRepository.getAuthorId(book.author);
        if(author.rowCount == 0){
            throw notFoundError("Can not found author")
        };
        const authorId = author.rows[0].id;

        const bookExist = await booksRepository.getBookById(id)
        if(bookExist.rowCount == 0){
            throw notFoundError("Can not found book")
        }

        await booksRepository.updateBook(book, compId, authorId, id);
    } catch(error) {
        throw error
    }
}

async function deleteBook(id: number){
    try{
        const bookExist = await booksRepository.getBookById(id);
        if(bookExist.rowCount == 0){
            throw notFoundError("Book not found")
        }
        await booksRepository.deleteBook(id)
    } catch(error){
        throw error
    }
}

async function getBookByAuthor(id: number){
    try{
        const authorExist = await booksRepository.getAuthorById(id);
        if(authorExist.rowCount == 0){
            throw notFoundError("Can not found author")
        }
       const books = await booksRepository.getBookByAuthor(id);
        return books;
    } catch(error){
        throw error
    }
}

async function postAuthor(author: string){
    try{
        const authorExist = await booksRepository.getAuthorByName(author);
        if(authorExist.rowCount != 0){
            throw conflictError("Author already registred")
        }

        await booksRepository.postAuthor(author)
    } catch(error) {
        throw error
    }
}

async function postPublishingCompany(company: string){
    try{
        const companyExist = await booksRepository.getCompanyByName(company);
        if(companyExist.rowCount != 0){
            throw conflictError("Company already registred")
        }

        await booksRepository.postCompany(company)
    } catch(error) {
        throw error
    }
}

const booksService = {
    postBook,
    getBooks,
    updateBook,
    deleteBook,
    getBookByAuthor,
    postAuthor,
    postPublishingCompany
}

export default booksService