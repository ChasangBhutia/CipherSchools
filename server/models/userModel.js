const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    require: true,
  },
  mobile: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  lastloggedIn: {
    type: Date,
    default: Date.now(),
  },
  settings: {
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
