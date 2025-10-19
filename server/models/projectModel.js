const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  projectSlug: {
    type: String,
    unique: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: String,
  description: String,
  rootFolderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "file",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  settings: {
    framework: {
      type: String,
      default: "react",
    },
    autoSave: {
      type: Boolean,
      default: true,
    },
  },
});

module.exports = mongoose.model("project", projectSchema);
