const projectModel = require("../models/projectModel");
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
