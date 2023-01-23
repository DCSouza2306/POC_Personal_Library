import joi from "joi";
import { publishingCompany } from "../protocols";

export const publishingCompanySchema = joi.object<publishingCompany>({
    name: joi.string().required(),
})