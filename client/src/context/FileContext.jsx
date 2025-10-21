import { createContext, useContext } from "react";
import { saveFile } from "../services/fileServices";
import { useProjectContext } from "./ProjectContext";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const { fetchProject } = useProjectContext();

  const updateFile = async (projectId, fileId, content) => {
    try {
      const response = await saveFile(fileId, content);
      if (response.data.success) {
        await fetchProject(projectId);
        alert("File saved");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <FileContext.Provider value={{ updateFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  return useContext(FileContext);
};
