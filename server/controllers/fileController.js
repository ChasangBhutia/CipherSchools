const fileModel = require("../models/fileModel");
const projectModel = require("../models/projectModel");

module.exports.createFileOrFolder = async (req, res) => {
  const { projectId, name, type, parentId, language } = req.body;
  const requiredFields = [];
  if (!projectId) requiredFields.push("Project ID");
  if (!name) requiredFields.push("Name");
  if (!type) requiredFields.push("type");

  if (requiredFields.length > 0)
    return res.error(
      400,
      "VALIDATION_ERROR",
      requiredFields,
      `Reduired Fields: ${requiredFields.join(", ")}`
    );

  if (!["file", "folder"].includes(type))
    return res.error(
      400,
      "VALIDATION_ERROR",
      ["type"],
      "Type must be file or folder"
    );

  try {
    const existingFileOrFolder = await fileModel.findOne({
      parentId: parentId,
      projectId,
      name,
      type,
    });
    if (existingFileOrFolder)
      return res.error(
        409,
        `${
          existingFileOrFolder.type === "file"
            ? "FILE_ALREADY_EXISTS"
            : "FOLDER_ALREADY_EXISTS"
        }`,
        `${
          existingFileOrFolder.type === "file"
            ? "File already exist with this name."
            : "Folder already exist with this name."
        }`
      );

    const newItem = await fileModel.create({
      projectId,
      parentId: parentId || null, // null if top-level
      name,
      type,
      content: type === "file" ? "" : null,
      language: type === "file" ? language || "text" : undefined,
      s3Key: type === "file" ? null : undefined,
      sizeInBytes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.success(
      201,
      `${newItem.type === "file" ? "File" : "Folder"} created successfully`,
      { newItem }
    );
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};

module.exports.getFilesOrFolders = async (req, res) => {
  const { id } = req.params;
  try {
    const files = await fileModel.find({ projectId: id });
    return res.success(200, "Files and folders found", { files });
  } catch (err) {
    console.error(err.message);
    return res.error(400, "INTERNAL_ERROR", "Something went wrong");
  }
};

module.exports.getFileOrFolder = async (req, res) => {
  const { id } = req.params;
  try {
    const existingFile = await fileModel.findById(id);
    if (!existingFile)
      return res.error(404, "NOT_FOUND", "File or folder not found");

    return res.success(
      200,
      `${existingFile.type === "file" ? "File" : "Folder"} found`,
      { existingFile }
    );
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};

module.exports.updateFileOrFolder = async (req, res) => {
  const { id } = req.params;
  const { content, name } = req.body;
  if (!name && typeof content === "undefined")
    return res.error(
      400,
      "VALIDATION_ERROR",
      "Either 'name' or 'content' must be changed"
    );
  try {
    const updateFields = {};
    if (name) updateFields.name = name;
    if (typeof content !== "undefined") updateFields.content = content;
    updateFields.updatedAt = new Date();
    const updatedFile = await fileModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!updatedFile)
      return res.error(404, "NOT_FOUND", "File or folder not found");

    const project = await projectModel.findById(updatedFile.projectId);
    project.updatedAt = new Date();
    await project.save();

    return res.success(
      200,
      `${updatedFile.type === "file" ? "File" : "Folder"} updated`,
      { updatedFile }
    );
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};

module.exports.deleteFileOrFolder = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await fileModel.findByIdAndDelete(id);
    if (!file) return res.error(404, "NOT_FOUND", "File or folder not found");
    await fileModel.deleteMany({ parentId: id });

    return res.success(200, "Deleted successfully");
  } catch (err) {
    console.error(err.message);
    return res.error(500, "INTERNAL_ERROR", "Something went wrong");
  }
};
