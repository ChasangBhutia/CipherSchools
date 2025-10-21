import api from "./api";

export const getProjects = () => {
  return api.get("/projects");
};

export const getProjectById = (projectId) => {
  return api.get(`/projects/${projectId}`);
};

export const createProject = (projectData) => {
  return api.post("/projects", projectData);
};

export const deleteUserProject = (projectId) => {
  return api.delete(`/projects/${projectId}`);
};
