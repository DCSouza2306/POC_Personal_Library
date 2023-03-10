import { Request, Response } from "express";
import booksService from "../services/books-service.js";
import httpStatus from "http-status";
import { author, publishingCompany } from "../protocols.js";

export async function postNewBook(req: Request, res: Response) {
    try {
        await booksService.postBook(req.body);
        res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        if(error.name == "NotFoundError"){
           return res.status(httpStatus.NOT_FOUND).send(error.message)
        }

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}

export async function getBooks(req: Request, res: Response){
    try{
        const { name } = req.query as Record<string, string> 
        const books = await booksService.getBooks(name);
        res.status(httpStatus.OK).send(books.rows)
    } catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}

export async function updateBook(req: Request, res: Response){
    try{
        const params = req.params;
        const id = Number(params.id);

        await booksService.updateBook(req.body, id);

        res.sendStatus(httpStatus.OK)
    } catch(error){
        if(error.name == "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error.message)
         }
 
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}

export async function deleteBook(req: Request, res: Response){
    try{
        const params = req.params;
        const id = Number(params.id);

        await booksService.deleteBook(id);
        res.sendStatus(httpStatus.OK)
    } catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}

export async function getBookByAuthor(req: Request, res: Response){
    try{
        const params = req.params;
        const id = Number(params.id);

        const books = await booksService.getBookByAuthor(id);
        res.status(httpStatus.OK).send(books.rows)
    } catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}

export async function postAuthor(req: Request, res: Response){
    try{
        const author = req.body as author
        await booksService.postAuthor(author.name);
        res.sendStatus(httpStatus.CREATED)
    } catch(error){
        if(error.name == "ConflictError"){
            return res.status(httpStatus.CONFLICT).send(error.message)
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}

export async function postPublishingCompany(req: Request, res: Response){
    try{
        const publishCompany = req.body as publishingCompany;
        await booksService.postPublishingCompany(publishCompany.name);
        res.sendStatus(httpStatus.CREATED)
    } catch(error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}


