import React, { useState } from "react";
import FileMenu from "./FileMenu";
import NamePrompt from "./NamePrompt";
import { FaFolder, FaFile } from "react-icons/fa";
import {
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiJson,
  SiTypescript,
} from "react-icons/si";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useFileContext } from "../context/FileContext";
import { getLanguageFromFileName } from "../utils/getLanguageFromFileName";
import RenamePrompt from "./RenamePrompt";

const getFileIcon = (fileName) => {
  if (!fileName) return <FaFile />;
  const ext = fileName.split(".").pop();
  switch (ext) {
    case "js":
      return <SiJavascript className="text-blue-400" />;
    case "jsx":
      return <SiReact className="text-blue-400" />;
    case "ts":
    case "tsx":
      return <SiTypescript className="text-blue-600" />;
    case "html":
      return <SiHtml5 className="text-orange-500" />;
    case "css":
      return <SiCss3 className="text-blue-600" />;
    case "json":
      return <SiJson className="text-green-500" />;
    default:
      return <FaFile />;
  }
};

const FileTreeNode = ({ node, projectId, openFile, createFileOrFolder }) => {
  const { renameFile, updateFile, deleteFileOrFolder, createNewFileOrFolder } =
    useFileContext();
  const [expanded, setExpanded] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showRenamePrompt, setShowRenamePrompt] = useState(false);
  const [promptType, setPromptType] = useState("file");
  const [renameType, setRenameType] = useState("");
  const [renameCurrName, setRenameCurrName] = useState("");

  const handleCreate = (type) => {
    setPromptType(type);
    setShowPrompt(true);
    setExpanded(true);
  };

  const handleSubmitName = (name) => {
    const payload = {
      projectId,
      parentId: node._id,
      name,
      type: promptType,
      language: promptType === "file" ? getLanguageFromFileName(name) : null,
    };

    createNewFileOrFolder(payload);

    setShowPrompt(false);
  };

  const deleteFile = (projectId, id) => {
    deleteFileOrFolder(projectId, id);
  };

  const handleRename = (type, name) => {
    setRenameType(type);
    setRenameCurrName(name);
    setShowRenamePrompt(true);
  };

  const handleFileClick = () => {
    if (node.type === "file") openFile(node);
    else if (node.type === "folder") {
      if (localStorage.getItem("parentId") === node._id)
        localStorage.setItem("parentId", "");
      else localStorage.setItem("parentId", node._id);
    }
  };

  const handleSubmitRename = (newName) => {
    if (!node?._id) return;
    renameFile(projectId, node._id, newName);
    setShowRenamePrompt(false);
  };

  return (
    <li className="ml-2">
      <div
        className="flex justify-between items-center py-1 px-2 hover:bg-white/10 rounded cursor-pointer"
        onClick={handleFileClick}
      >
        <div className="flex items-center gap-2">
          {node.type === "folder" && (
            <button onClick={() => setExpanded(!expanded)} className="w-4 mr-2">
              {expanded ? <ChevronDown /> : <ChevronRight />}
            </button>
          )}
          <span className="select-none flex items-center gap-2">
            {node.type === "folder" ? <FaFolder /> : getFileIcon(node.name)}{" "}
            {node.name}
          </span>
        </div>

        <FileMenu
          isFolder={node.type === "folder"}
          onDelete={() => deleteFile(projectId, node._id)}
          onRename={() => handleRename(node.type, node.name)}
          onCreateFolder={() => handleCreate("folder")}
          onCreateFile={() => handleCreate("file")}
        />
      </div>

      {node.children?.length > 0 && expanded && (
        <ul className="ml-5">
          {node.children.map((child) => (
            <FileTreeNode
              key={child._id}
              node={child}
              projectId={projectId}
              openFile={openFile}
              deleteFile={deleteFile}
              createFileOrFolder={createFileOrFolder}
              renameFile={renameFile}
            />
          ))}
        </ul>
      )}

      {showRenamePrompt && (
        <RenamePrompt
          currentName={renameCurrName}
          type={renameType}
          onSubmit={handleSubmitRename}
          onCancel={() => setShowRenamePrompt(false)}
          setShowRenamePrompt={setShowRenamePrompt}
        />
      )}

      {showPrompt && (
        <NamePrompt
          type={promptType}
          onSubmit={handleSubmitName}
          onCancel={() => setShowPrompt(false)}
        />
      )}
    </li>
  );
};

export default FileTreeNode;
