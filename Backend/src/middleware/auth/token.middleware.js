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
const verifyTokenAdmin = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const auth = req.headers["authorization"];
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY_ADMIN, (err, payload) => {
      if (err) {
        throw new Error(err);
      }
      const role_id = payload.role_id;
      const admin_id = payload.id;
      res.locals.role_id = role_id;
      res.locals.admin_id = admin_id;
      next();
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};

export { verifyTokenUser, verifyTokenAdmin };
