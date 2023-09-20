import jwt from "jsonwebtoken";

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
  return token;
};

const createRefreshToken = (id) => {
  const refresh_token = jwt.sign({ id }, process.env.SECRET_REFRESH_KEY, {
    expiresIn: "30d",
  });
  return refresh_token;
};
const verifyRefreshToken = async (token) => {
  jwt.verify(token, process.env.SECRET_REFRESH_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ sucesss: false, message: err.message });
    }
    const idPayload = payload.id;
    return idPayload;
  });
};

const createTokenAdmin = (id, role_id) => {
  const token = jwt.sign({ id, role_id }, process.env.SECRET_KEY_ADMIN, {
    expiresIn: "2h",
  });
  return token;
};
const createRefreshTokenAdmin = (id, role_id) => {
  const refresh_token = jwt.sign({ id }, process.env.SECRET_REFRESH_KEY_ADMIN, {
    expiresIn: "30d",
  });
  return refresh_token;
};
const verifyRefreshTokenAdmin = async (token) => {
  jwt.verify(token, process.env.SECRET_REFRESH_KEY_ADMIN, (err, payload) => {
    if (err) {
      return res.status(401).json({ sucesss: false, message: err.message });
    }
    const idPayload = payload.id;
    return idPayload;
  });
};

export {
  createToken,
  createRefreshToken,
  verifyRefreshToken,
  createTokenAdmin,
  createRefreshTokenAdmin,
  verifyRefreshTokenAdmin,
};
