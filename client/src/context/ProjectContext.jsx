import { createContext, useContext, useEffect, useState } from "react";
import {
  createProject,
  deleteUserProject,
  getProjectById,
  getProjects,
} from "../services/projectServices";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [projectFiles, setProjectFiles] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        if (response.data.success) {
          setProjects(response.data.data.projects);
        }
      } catch (err) {
        console.error(`Error fetching projects: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [refresh]);

  const fetchProject = async (projectId) => {
    try {
      setLoading(true);
      const response = await getProjectById(projectId);
      if (response.data.success) {
        setProject(response.data.data.project);
        setProjectFiles(response.data.data.files);
      }
    } catch (err) {
      console.error(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createNewProject = async (projectData) => {
    try {
      const response = await createProject({ name: projectData });
      if (response.data.success) alert(response.data.message);
      setRefresh(refresh + 1);
    } catch (err) {
      console.error(`Error creating project: ${err.message}`);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const response = await deleteUserProject(projectId);
      if (response.data.success) {
        setRefresh(refresh + 1);
        alert(response.data.message);
      }
    } catch (err) {
      console.error(`Error deleting project: ${err.message}`);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        deleteProject,
        createNewProject,
        projects,
        fetchProject,
        loading,
        project,
        projectFiles,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
