import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../context/ProjectContext";
import Sidebar from "../components/Sidebar";
import EditorPane from "../components/Editor";
import SaveToolbar from "../components/SaveToolbar";
import Navbar from "../components/Navbar";
import Preview from "../components/LivePreview";

// Convert flat file list → hierarchical tree
const buildFileTree = (files) => {
  const map = {};
  const roots = [];
  files.forEach((f) => (map[f._id] = { ...f, children: [] }));
  files.forEach((f) => {
    if (f.parentId && map[f.parentId])
      map[f.parentId].children.push(map[f._id]);
    else roots.push(map[f._id]);
  });
  return roots;
};

export default function ProjectEditor() {
  const { projectId } = useParams();
  const { loading, fetchProject, project, projectFiles } = useProjectContext();

  const [selectedFile, setSelectedFile] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [sandpackFiles, setSandpackFiles] = useState({});

  useEffect(() => {
    if (projectId) fetchProject(projectId);
  }, [projectId]);

  const openFile = (file) => {
    setSelectedFile(file);
    if (file.type === "file") {
      setEditorContent(file.content || "");
    }
  };

  const saveFile = async () => {
    if (!selectedFile) return;
    try {
      // Backend API call to save
      await fetch(`/api/files/${selectedFile._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editorContent }),
      });
      selectedFile.content = editorContent;
    } catch (err) {
      console.error(err);
    }
  };

  const createFileAtRoot = async (type = "file") => {
    if (!newFileName) return;
    setCreating(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/files`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newFileName, type, parentId: null }),
      });
      const newFile = await res.json();
      projectFiles.push(newFile.item);
      setNewFileName("");
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleRun = () => {
    const filesObj = {};

    projectFiles.forEach((f) => {
      if (f.type === "file") filesObj[`/${f.name}`] = f.content || "";
    });

    // Ensure /index.js exists
    if (!filesObj["/index.js"]) {
      filesObj["/index.js"] =
        'import React from "react"; import { createRoot } from "react-dom/client"; import App from "./App.jsx"; createRoot(document.getElementById("root")).render(<App />);';
    }

    // Ensure /App.jsx exists
    if (!filesObj["/App.jsx"]) {
      const firstJsx =
        Object.keys(filesObj).find((name) => name.endsWith(".jsx")) ||
        "/App.jsx";
      if (!filesObj[firstJsx])
        filesObj["/App.jsx"] =
          "export default function App() { return <div>Hello World</div> }";
    }

    setSandpackFiles(filesObj);
    setIsPreview(true);
  };

  const handleStop = () => setIsPreview(false);
  const handleSave = async () => await saveFile();
  const handleDeploy = () => console.log("Deploying project...");

  const fileTree = buildFileTree(projectFiles || []);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      <Navbar
        projectName={project?.name || "Untitled Project"}
        onRun={isPreview ? handleStop : handleRun}
        onSave={handleSave}
        onDeploy={handleDeploy}
        isPreview={isPreview}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          project={project}
          loading={loading}
          fileTree={fileTree}
          newFileName={newFileName}
          setNewFileName={setNewFileName}
          creating={creating}
          createFileAtRoot={createFileAtRoot}
          openFile={openFile}
        />

        {isPreview ? (
          <Preview files={sandpackFiles} />
        ) : (
          <div className="flex-1 flex flex-col">
            <EditorPane
              projectId={projectId}
              selectedFile={selectedFile}
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
          </div>
        )}
      </div>
    </div>
  );
}
