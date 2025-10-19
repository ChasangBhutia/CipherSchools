const express = require("express");
const {
  createProject,
  getAllProjects,
  getProject,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject);
router.get("/:id", getProject);
router.get("/", getAllProjects);
//router.put('/:id', updateProject)
router.delete("/:id", deleteProject);

module.exports = router;
