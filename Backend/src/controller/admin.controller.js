import bcrypt from "bcrypt";
import { db } from "../config/db.js";
import { createRefreshToken, createTokenAdmin } from "../helpers/jwt.helper.js";

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const getAdmin = await db
      .select("*")
      .from("login_admin")
      .where("username", username)
      .first();
    const pwDB = getAdmin.password;
    if (!bcrypt.compareSync(password, pwDB)) {
      throw new Error("Credential anda salah");
    } else {
      const accessToken = createTokenAdmin(getAdmin.id, getAdmin.role_id);
      const refreshToken = createRefreshToken(getAdmin.id, getAdmin.role_id);
      return res.status(200).json({
        success: true,
        message: "Login berhasil",
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user_id: getAdmin.id,
          role_id: getAdmin.role_id,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export { loginAdmin };
