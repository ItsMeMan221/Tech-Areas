import { Router } from "express";
import { getArticle, postArticle } from "../controller/article.controller.js";
import { verifyTokenAdmin } from "../middleware/auth/token.middleware.js";
import { postArticleValidation } from "../middleware/validation/article.middleware.js";

const articleRoutes = Router();

articleRoutes.get("/", getArticle);
articleRoutes.get("/:id", getArticle);
articleRoutes.post("/", verifyTokenAdmin, postArticleValidation, postArticle);

export { articleRoutes };
