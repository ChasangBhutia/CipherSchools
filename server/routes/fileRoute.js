const express = require("express");
const {
  createFileOrFolder,
  getFileOrFolder,
  updateFileOrFolder,
  deleteFileOrFolder,
} = require("../controllers/fileController");
const router = express.Router();

router.post("/", createFileOrFolder);
router.get("/:id", getFileOrFolder);
router.put("/:id", updateFileOrFolder);
router.delete("/:id", deleteFileOrFolder);

module.exports = router;
