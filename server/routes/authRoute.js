const express = require("express");
const {
  register,
  login,
  logout,
  getUser,
} = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", isLoggedIn, getUser);

module.exports = router;
