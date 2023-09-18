import jwt from "jsonwebtoken";
const verifyTokenUser = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const auth = req.headers["authorization"];
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        throw new Error(err);
      }
      return next();
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};

export { verifyTokenUser };
