import { brotliDecompress } from "zlib";
import db from "../database/database.js";
import { CompanyEntity, AuthorEntity, book, BookEntity, author } from "../protocols.js";

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

async function insertBook(book: book, compId: number, authorId: number){
    try{
        return db.query(`
            INSERT INTO books ("title","author_id", "publishing_comp_id", "year", "edition")
            VALUES ($1, $2, $3, $4, $5);
        `,[book.title, authorId, compId, book.year, book.edition])
    } catch(error) {
        throw error
    }
}

async function getBooks(){
    try{
        return db.query<BookEntity>(`
            SELECT books.title, authors.name AS "author","publishing_companies".name AS publishCompany, books.year, books.edition 
            FROM books 
            JOIN authors ON authors.id = books."author_id"
            JOIN "publishing_companies" ON "publishing_companies".id = books."publishing_comp_id";
        `)
    } catch(error) {
        throw error
    }
}

async function getBookById(id: number){
    try{
        return db.query(`
            SELECT * FROM books WHERE id = $1
        `,[id])
    } catch(error) {
        throw error
    }
}

async function getBooksByName(name: string){
    try{
        return db.query<BookEntity>(`
        SELECT books.title, authors.name AS "author","publishing_companies".name AS publishCompany, books.year, books.edition 
        FROM books 
        JOIN authors ON authors.id = books."author_id"
        JOIN "publishing_companies" ON "publishing_companies".id = books."publishing_comp_id"
        WHERE "title" ILIKE '%' || $1 || '%';
        `,[name])
    } catch(error) {
        throw error
    }
}

async function updateBook(book: book, compId: number, authorId: number, bookId: number){
    try{
        return db.query(`
            UPDATE books SET title = $1, "author_id" = $2, "publishing_comp_id" = $3, year = $4, edition = $5
            WHERE id = $6
        `,[book.title, authorId, compId, book.year, book.edition, bookId])
    } catch(error) {
        throw error
    }
}

async function deleteBook(id: number){
    try{
        db.query(`
        DELETE FROM books WHERE id = $1
        `,[id])
    } catch(error){
        throw error
    }
};

async function getBookByAuthor(id: number){
    try{
        return db.query(`
            SELECT * FROM books WHERE "author_id" = $1
        `,[id])
    } catch(error){
        throw error
    }
}

async function getAuthorById(id: number){
    try{
        return db.query(`
            SELECT * FROM authors WHERE id = $1
        `,[id])
    } catch(error){
        throw error
    }
}

async function getAuthorByName(author: string){
    try{
        return db.query<author>(`
            SELECT * FROM authors WHERE name = $1;
        `,[author])
    } catch(error) {
        throw error
    }
}

async function postAuthor(author: string){
    try{
        return db.query(`
            INSERT INTO authors (name) VALUES ($1);
        `,[author])
    } catch(error) {
        throw error
    }
}

async function getCompanyByName(company: string){
    try{
        return db.query(`
            SELECT * FROM "publishing_companies" WHERE name = $1;
        `,[company])
    } catch(error) {
        throw error;
    }
}

async function postCompany(company: string){
    try{
        return db.query(`
            INSERT INTO "publishing_companies" (name) VALUES ($1)
        `,[company])
    } catch(error) {
        throw error;
    }
}

const booksRepository = {
    getPublishingCompId,
    getAuthorId,
    insertBook,
    getBooks,
    getBookById,
    getBooksByName,
    getBookByAuthor,
    updateBook,
    deleteBook,
    getAuthorByName,
    postAuthor,
    getCompanyByName,
    postCompany,
    getAuthorById
}

export default booksRepository