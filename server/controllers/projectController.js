const fileModel = require("../models/fileModel");
const projectModel = require("../models/projectModel");
const { createReactBoilerplate } = require("../utils/createReactBoilerplate");
const { createSlug } = require("../utils/createSlug");

module.exports.createProject = async (req, res) => {
  const { name, description, settings } = req.body;
  if (!name)
    return res.error(
      400,
      "VALIDATION_ERROR",
      ["name"],
      "Project name is required."
    );

  try {
    const projectSlug = createSlug(name);
    const existingSlug = await projectModel.findOne({ projectSlug });
    while (existingSlug) {
      projectSlug = createSlug(name);
      existingSlug = await projectModel.findOne({ projectSlug });
    }

    const project = await projectModel.create({
      projectSlug,
      userId: req.user.id,
      name,
      description: description || "",
      settings: settings || {},
    });

    await createReactBoilerplate(project._id, project.projectSlug);

    return res.success(201, "Project created", {
      projectId: project._id,
      name: project.name,
      projectSlug: project.projectSlug,
      description: project.description,
      settings: project.settings,
    });
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};

module.exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.find({ userId: req.user.id });
    return res.success(200, "Projects Found", { projects });
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};

module.exports.getProject = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.error(
      400,
      "MISSING_PARAMETER",
      ["Project Id"],
      "Required parameter 'id' is missing in the request"
    );

  try {
    const project = await projectModel.findById(id);
    if (!project) return res.error(404, "NOT_FOUND", "Project not found");
    return res.success(200, "Project found", { project });
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};

module.exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.error(
      400,
      "MISSING_PARAMETER",
      ["Project Id"],
      "Required parameter 'id' is missing in the request"
    );
  try {
    const project = await projectModel.findByIdAndDelete(id);
    if (!project) return res.error(404, "NOT_FOUND", "Project not found");
    await fileModel.deleteMany({ projectId: project._id });
    return res.success(200, "Project Deleted");
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};
