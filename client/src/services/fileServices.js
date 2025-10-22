import api from "./api";

export const getFiles = (projectId) => {
  return api.get(`/files/${projectId}`);
};

export const saveFile = (fileId, content) => {
  console.log(content);

  return api.put(`/files/${fileId}`, { content });
};

export const rename = (fileId, name) => {
  return api.put(`/files/${fileId}`, { name });
};

export const createFileOrFolder = (data) => {
  return api.post("/files", data);
};

export const deleteFile = (id) => {
  return api.delete(`/files/${id}`);
};
