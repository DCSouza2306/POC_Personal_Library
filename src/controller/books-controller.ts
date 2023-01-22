import { Request, Response } from "express";
import booksService from "../services/books-service.js";
import httpStatus from "http-status";

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


    } catch(error){
        console.log
    }
}

