import { db } from "../../config/db.js";
import bcrypt from "bcrypt";
const registerValidation = async (req, res, next) => {
  let { username, email, password, nama, no_handphone, gender_id, avatar } =
    req.body;
  const error = {};
  let errStatus = false;
  const emailPattern =
    /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!username) {
    error.username = "Username is required";
    errStatus = true;
  } else if (username.length < 5) {
    error.username = "Username must be at least five characters";
    errStatus = true;
  }
  if (!email) {
    error.email = "Email is required";
    errStatus = true;
  } else if (!email.match(emailPattern)) {
    error.email = "Not a valid email";
    errStatus = true;
  } else {
    const duplEmail = await db
      .select("")
      .from("login_user")
      .where("email", email);
    if (duplEmail.length > 0) {
      error.email = "This Email has been used";
      errStatus = true;
    }
  }

  if (!password) {
    error.password = "Password is required";
  } else if (password.length < 6) {
    error.password = "Password must be at least six characters";
    errStatus = true;
  }
  if (!nama) {
    error.nama = "Nama is required";
    errStatus = true;
  }
  if (!no_handphone) {
    error.no_handphone = "No handphone is required";
    errStatus = true;
  } else if (no_handphone.length < 10) {
    error.no_handphone =
      "Nomor Handphone harus terdiri dari angka dan minimal 10 digit";
    errStatus = true;
  }
  if (!gender_id) {
    error.gender_id = "Gender is required";
    errStatus = true;
  }
  if (errStatus) {
    return res.status(400).json({ success: "false", error });
  }
  return next();
};

const loginValidation = async (req, res, next) => {
  const error = {
    success: true,
    error: {},
  };
  const { email, password } = req.body;
  const emailPattern =
    /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!email) {
    error.error.email = "Email is required";
    error.success = false;
  } else if (!email.match(emailPattern)) {
    error.error.email = "Not a valid email";
    error.success = false;
  } else {
    const isEmailExist = await db("login_user")
      .where("email", email)
      .count("email as count_email");
    if (isEmailExist[0].count_email < 1) {
      error.error.user = "User did not exist";
      error.success = false;
    }
  }
  if (!password) {
    error.error.password = "Password is required";
    error.success = false;
  }
  if (!error.success) {
    res.status(400).json(error);
  }
  return next();
};
const updateUserValidation = async (req, res, next) => {
  const { username, nama, no_handphone, gender_id, avatar } = req.body;
  const error = {
    success: true,
    error: {},
  };
  if (!username) {
    error.success = false;
    error.error.username = "Username is required";
  }
  if (!nama) {
    error.success = false;
    error.error.nama = "Nama is required";
  }
  if (!no_handphone) {
    error.success = false;
    error.error.no_handphone = "No handphone is required";
  }
  if (!gender_id) {
    error.success = false;
    error.error.gender_id = "Gender is required";
  }
  if (!error.success) {
    return res.status(400).json(error);
  }
  return next();
};

const changePasswordValidation = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.params;
  const error = {
    success: true,
    error: {},
  };
  if (!currentPassword) {
    error.error.currentPassword = "Current password is required";
    error.success = false;
  } else {
    const getCurrentPassword = await db
      .select("password")
      .from("login_user")
      .where("id", id)
      .first();
    const passDB = getCurrentPassword.password;
    if (!bcrypt.compareSync(currentPassword, passDB)) {
      error.success = false;
      error.error.currentPassword = "Your current password is wrong";
    }
  }
  if (!newPassword) {
    error.error.newPassword = "New password is required";
    error.success = false;
  } else if (newPassword.length < 6) {
    error.success = false;
    error.error.newPassword = "Password must at least contain 6 characters";
  }
  if (!error.success) {
    return res.status(400).json(error);
  }
  return next();
};
export {
  registerValidation,
  loginValidation,
  updateUserValidation,
  changePasswordValidation,
};
