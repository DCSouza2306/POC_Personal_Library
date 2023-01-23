import joi from "joi";
import { author } from "../protocols";

export const authorSchema = joi.object<author>({
    name: joi.string().required(),
})