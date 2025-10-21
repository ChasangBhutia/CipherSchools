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
