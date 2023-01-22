import joi from "joi";
import { book } from "../protocols";

export const bookSchema = joi.object<book>({
    title: joi.string().required(),
    author: joi.string().required(),
    publishCompany: joi.string().required(),
    year: joi.number().required(),
    edition: joi.string().required()
})