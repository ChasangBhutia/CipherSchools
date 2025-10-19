const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "file",
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["folder", "file"],
    required: true,
  },
  s3Key: String, //only for files
  language: String,
  sizeInBytes: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("file", fileSchema);
