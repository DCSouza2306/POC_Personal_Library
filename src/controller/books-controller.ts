import { Request, Response } from "express";
import booksService from "../services/books-service.js";
import httpStatus from "http-status";

export async function postNewBook(req: Request, res: Response) {
    try {
        await booksService.postBook(req.body);
        res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

