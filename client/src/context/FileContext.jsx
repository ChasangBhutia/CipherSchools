import { createContext, useContext, useState } from "react";
import {
  createFileOrFolder,
  deleteFile,
  rename,
  saveFile,
} from "../services/fileServices";
import { useProjectContext } from "./ProjectContext";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const { fetchProject } = useProjectContext();
  const [fileSaving, setFileSaving] = useState(false);

  const updateFile = async (projectId, fileId, content) => {
    try {
      setFileSaving(true);
      const response = await saveFile(fileId, content);
      if (response.data.success) {
        await fetchProject(projectId);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setFileSaving(false);
    }
  };

  const renameFile = async (projectId, fileId, name) => {
    try {
      const response = await rename(fileId, name);
      if (response.data.success) {
        await fetchProject(projectId);
      }
    } catch (err) {
      console.error(`Error renaming file: ${err.message}`);
    }
  };

  const createNewFileOrFolder = async (data) => {
    try {
      const response = await createFileOrFolder(data);
      if (response.data.success) {
        alert(response.data.message);
      }
      await fetchProject(data.projectId);
    } catch (err) {
      console.error(`Error creating file or folder: ${err.message}`);
    }
  };

  const deleteFileOrFolder = async (projectId, id) => {
    try {
      const response = await deleteFile(id);
      if (response.data.success) alert(response.data.message);
      await fetchProject(projectId);
    } catch (err) {
      console.error(`Error deleting the file: ${err.message}`);
    }
  };

  return (
    <FileContext.Provider
      value={{
        renameFile,
        deleteFileOrFolder,
        createNewFileOrFolder,
        setFileSaving,
        fileSaving,
        updateFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  return useContext(FileContext);
};
