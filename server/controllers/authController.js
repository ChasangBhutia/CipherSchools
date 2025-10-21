const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

module.exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const requiredfields = [];
  if (!firstName) requiredfields.push("firstName");
  if (!lastName) requiredfields.push("lastName");
  if (!email) requiredfields.push("email");
  if (!password) requiredfields.push("password");

  if (requiredfields.length > 0) {
    return res.error(
      400,
      "VALIDATION_ERROR",
      requiredfields,
      `Required fields: ${requiredfields.join(", ")}`
    );
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.error(
        409,
        "USER_ALREADY_EXISTS",
        "A user with this email already exists. Please login to continue"
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    const token = generateToken(user._id, user.email);
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const name = `${user.firstName} ${user.lastName}`;
    return res.success(201, "User Created", {
      userId: user._id,
      name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const requiredFields = [];
  if (!email) requiredFields.push("email");
  if (!password) requiredFields.push("password");
  if (requiredFields.length > 0) {
    return res.error(
      400,
      "VALIDATION_ERROR",
      requiredFields,
      `Required fields: ${requiredFields.join(", ")}`
    );
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.error(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result)
      return res.error(401, "INVALID_CREDENTIALS", "Invalid email or password");

    const token = generateToken(user._id, user.email);
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const name = `${user.firstName} ${user.lastName}`;
    return res.success(200, "User logged in", {
      userId: user._id,
      name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.success(200, "Logged out successfully");
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return res.error(404, "NOT_FOUND", "User not found");
    return res.success(200, "User found", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};
