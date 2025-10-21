import api from "./api";

export const getFiles = (projectId) => {
  return api.get(`/files/${projectId}`);
};

export const saveFile = (fileId, content) => {
  return api.put(`/files/${fileId}`, { content });
};
