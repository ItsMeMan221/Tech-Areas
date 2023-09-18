import { Router } from "express";
import {
  registerUser,
  loginUser,
  refresh_token,
  getProfile,
  updateProfile,
  changePassword,
} from "../controller/user.controller.js";
import {
  changePasswordValidation,
  loginValidation,
  registerValidation,
} from "../middleware/validation/user.middleware.js";
import { verifyTokenUser } from "../middleware/auth/token.middleware.js";

export const userRoutes = Router();

userRoutes.post("/register", registerValidation, registerUser);
userRoutes.post("/login", loginValidation, loginUser);
userRoutes.post("/refresh-token", refresh_token);
userRoutes.get("/:id", verifyTokenUser, getProfile);
userRoutes.put("/:id", verifyTokenUser, updateProfile);
userRoutes.patch(
  "/:id",
  verifyTokenUser,
  changePasswordValidation,
  changePassword
);
