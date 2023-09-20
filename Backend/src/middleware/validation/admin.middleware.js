import { db } from "../../config/db.js";
import bcrypt from "bcrypt";

const loginAdminValidation = async (req, res, next) => {
  const error = {
    success: true,
    error: {},
  };
  const { username, password } = req.body;
  if (!username) {
    error.error.username = "Admin is required";
    error.success = false;
  } else {
    const isExist = await db("login_admin")
      .where("username", username)
      .andWhere("active", 1)
      .count("username as count_username");
    if (isExist[0].count_username < 1) {
      error.error.user = "Admin did not exist";
      error.success = false;
    }
  }
  if (!password) {
    error.error.password = "Password is required";
    error.success = false;
  }
  if (!error.success) {
    return res.status(400).json(error);
  }
  return next();
};

const roleAdmin = (req, res, next) => {
  if (!req.headers["ADMIN_ROLES"]) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const roles = req.headers["ADMIN_ROLES"];
  return next(roles);
};

export { loginAdminValidation, roleAdmin };
