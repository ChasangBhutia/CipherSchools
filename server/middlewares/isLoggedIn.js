const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res.error(401, "AUTH_ERROR", "You must log in to continue.");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};

module.exports = isLoggedIn;
