import express from "express";
import { json } from "express";
import cors from "cors";
import routerBook from "./router/books-router.js";

const app = express();
app.use(json())
    .use(cors())
    .get("/health", (req, res) => res.send("Ok"))
    .use("/books",routerBook)


app.listen(4000, () => console.log("Server Runing..."))