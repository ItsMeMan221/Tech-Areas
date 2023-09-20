import { Router } from "express";
import { loginAdminValidation } from "../middleware/validation/admin.middleware.js";
import { loginAdmin } from "../controller/admin.controller.js";

const adminRoutes = Router();

adminRoutes.post("/login", loginAdminValidation, loginAdmin);

export { adminRoutes };
