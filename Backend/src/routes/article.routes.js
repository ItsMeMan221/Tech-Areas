import { Router } from "express";
import { getArticle } from "../controller/article.controller.js";

const articleRoutes = Router();

articleRoutes.get("/", getArticle);
articleRoutes.get("/:id", getArticle);

export { articleRoutes };
