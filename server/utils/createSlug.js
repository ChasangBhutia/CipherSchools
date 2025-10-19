const { nanoid } = require("nanoid");

module.exports.createSlug = (raw) => {
  const baseSlug = raw
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  return `${baseSlug}-${nanoid(6)}`;
};
