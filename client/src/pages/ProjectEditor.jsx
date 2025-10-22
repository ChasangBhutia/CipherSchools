import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../context/ProjectContext";
import Sidebar from "../components/Sidebar";
import EditorPane from "../components/Editor";
import Navbar from "../components/Navbar";

// Convert flat file list → hierarchical tree
const buildFileTree = (files) => {
  const map = {};
  const roots = [];

  files.forEach((f) => (map[f._id] = { ...f, children: [] }));
  files.forEach((f) => {
    if (f.parentId && map[f.parentId]) {
      map[f.parentId].children.push(map[f._id]);
    } else {
      roots.push(map[f._id]);
    }
  });

  return roots;
};

// Recursive function to convert file tree → Sandpack files with relative paths
const buildSandpackFiles = (nodes, currentPath = "") => {
  let files = {};

  nodes.forEach((node) => {
    const path = currentPath ? `${currentPath}/${node.name}` : `/${node.name}`;

    if (node.type === "file") {
      files[path] = node.content || "";
    }

    if (node.type === "folder" && node.children?.length > 0) {
      files = { ...files, ...buildSandpackFiles(node.children, path) };
    }
  });

  return files;
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // responsive sidebar

  useEffect(() => {
    if (projectId) fetchProject(projectId);
  }, [projectId]);

  const openFile = (file) => {
    setSelectedFile(file);
    if (file.type === "file") setEditorContent(file.content || "");
  };

  const saveFile = async () => {
    if (!selectedFile) return;
    try {
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

  const handleRun = () => {
    const fileTree = buildFileTree(projectFiles || []);
    let filesObj = buildSandpackFiles(fileTree);

    const appFilePath =
      Object.keys(filesObj).find((f) => f.endsWith("App.jsx")) || "/App.jsx";

    filesObj["/index.js"] = `
      import React from "react";
      import { createRoot } from "react-dom/client";
      import App from "${appFilePath}";
      createRoot(document.getElementById("root")).render(<App />);
    `;

    setSandpackFiles(filesObj);
    setIsPreview(true);
  };

  const handleStop = () => setIsPreview(false);
  const handleSave = async () => await saveFile();
  const handleDeploy = () => console.log("Deploying project...");

  const fileTree = buildFileTree(projectFiles || []);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      {/* Navbar */}
      <Navbar
        projectName={project?.name || "Untitled Project"}
        onRun={isPreview ? handleStop : handleRun}
        onSave={handleSave}
        onDeploy={handleDeploy}
        isPreview={isPreview}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar
          project={project}
          fileTree={fileTree}
          newFileName={newFileName}
          setNewFileName={setNewFileName}
          creating={creating}
          openFile={openFile}
          deleteFile={() => {}}
          renameFile={() => {}}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col">
          <EditorPane
            files={sandpackFiles}
            projectId={projectId}
            selectedFile={selectedFile}
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            projectName={project?.name || "Untitled Project"}
            onRun={isPreview ? handleStop : handleRun}
            onSave={handleSave}
            isPreview={isPreview}
          />
        </div>
      </div>
    </div>
  );
}
