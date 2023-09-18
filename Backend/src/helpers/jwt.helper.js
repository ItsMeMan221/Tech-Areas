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
export { createToken, createRefreshToken, verifyRefreshToken };
