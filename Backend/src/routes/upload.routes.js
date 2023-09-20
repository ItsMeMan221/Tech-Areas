import { Router } from "express";
import { uploadController } from "../controller/upload.controller.js";

const uploadRouter = Router();

uploadRouter.post("/uploadImage", uploadController);

export { uploadRouter };
