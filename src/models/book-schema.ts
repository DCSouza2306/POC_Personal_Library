import joi from "joi";
import { book } from "../protocols";

export const bookSchema = joi.object<book>({
    title: joi.string().required(),
    authors: joi.array().required(),
    publishCompany: joi.string().required(),
    year: joi.number().required(),
    edition: joi.string().required()
})