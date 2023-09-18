import bcrypt from "bcrypt";
import { db } from "../config/db.js";
import {
  createToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt.helper.js";

const registerUser = async (req, res) => {
  let { username, email, password, nama, no_handphone, gender_id, avatar } =
    req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await db.transaction(async (trx) => {
      const id = await trx("login_user").insert(
        {
          username,
          email,
          password: hashedPassword,
          avatar,
        },
        ["id"]
      );
      await trx("detail_user").insert({
        id_user: id[0],
        nama,
        no_handphone,
        gender_id,
      });
    });
    return res.status(201).json({
      success: true,
      message: `User dengan email ${email} telah berhasil dibuat`,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const getUser = await db
      .select("*")
      .from("login_user")
      .where("email", email)
      .first();
    const pwDB = getUser.password;
    if (!bcrypt.compareSync(password, pwDB)) {
      return res
        .status(401)
        .json({ success: false, message: "Credential anda salah" });
    } else {
      const accessToken = createToken(getUser.id);
      const refreshToken = createRefreshToken(getUser.id);
      return res.status(200).json({
        success: true,
        message: "Login berhasil",
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user_id: getUser.id,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const refresh_token = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      throw Error("No refresh token!");
    }
    const userId = await verifyRefreshToken(refreshToken);
    const newToken = createToken(userId);
    return res.status(200).json({
      success: true,
      message: "Access token berhasil direfresh",
      accessToken: newToken,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    await db.transaction(async (trx) => {
      const infoLogin = await trx("login_user")
        .select("username", "email")
        .where("id", id)
        .first();
      const detail_user = await trx("detail_user")
        .select(
          "detail_user.nama",
          "detail_user.no_handphone",
          "gender.description"
        )
        .join("gender", "detail_user.gender_id", "=", "gender.id")
        .where("detail_user.id_user", id)
        .first();

      const response = {
        ...infoLogin,
        ...detail_user,
      };

      res.status(200).json(response);
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
const updateProfile = async (req, res) => {
  const { id } = req.params;

  let { username, nama, no_handphone, gender_id, avatar } = req.body;
  try {
    const transaction = await db.transaction(async (trx) => {
      await db("login_user").update({ username, avatar }).where("id", id);
      await db("detail_user")
        .update({ nama, no_handphone, gender_id })
        .where("id_user", id);
    });
    if (transaction === undefined) {
      return res
        .status(200)
        .json({ success: true, message: "Profile berhasil diupdate" });
    } else {
      throw new Error(transaction.message);
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
const changePassword = async (req, res) => {
  let { currentPassword, newPassword } = req.body;
  const { id } = req.params;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const trx = await db("login_user")
      .update({ password: hashedPassword })
      .where("id", id);
    if (trx > 0) {
      return res
        .status(201)
        .json({ success: true, message: "Your password has been changed" });
    } else {
      throw new Error("Internal server error");
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export {
  registerUser,
  loginUser,
  refresh_token,
  getProfile,
  updateProfile,
  changePassword,
};
