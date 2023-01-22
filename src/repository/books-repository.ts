import { number } from "joi";
import db from "../database/database.js";
import { CompanyEntity, AuthorEntity, book, BookEntity } from "../protocols.js";

async function getPublishingCompId(compName: string){
    try{
        return db.query<CompanyEntity>(`
            SELECT * FROM "publishing_companies" WHERE name = $1
        `,[compName])
    } catch(error) {
        throw error
    }
}

async function getAuthorId(author: string){
    try{
        return db.query<AuthorEntity>(`
            SELECT * FROM "authors" WHERE name = $1
        `,[author])
    } catch(error) {
        throw error
    }
}

async function insertBook(book: book, compId: number){
    try{
        return db.query(`
            INSERT INTO books ("title", "publishing_comp_id", "year", "edition")
            VALUES ($1, $2, $3, $4);
        `,[book.title, compId, book.year, book.edition])
    } catch(error) {
        throw error
    }
}

async function getBooks(){
    try{
        return db.query<BookEntity>(`
            SELECT * FROM books;
        `)
    } catch(error) {
        throw error
    }
}

async function insertAuthorBook(bookId: number, authorId: number){
    try{
        return db.query(`
            INSERT INTO "books_authors" ("book_id", "author_id")
            VALUES($1, $2);
        `,[bookId, authorId])
    } catch(error) {
        throw error
    }
}

const booksRepository = {
    getPublishingCompId,
    getAuthorId,
    insertBook,
    getBooks,
    insertAuthorBook
}

export default booksRepository