import { useState } from "react";
import FileMenu from "./FileMenu";
import { FaFolder, FaFile } from "react-icons/fa";

const FileTreeNode = ({
  node,
  openFile,
  deleteFile,
  createFile,
  renameFile,
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleCreateFile = () => {
    const fileName = prompt("Enter new file name");
    if (fileName) createFile(fileName, node._id);
  };

  const handleRenameFile = () => {
    const newName = prompt("Enter new name", node.name);
    if (newName) renameFile(node._id, newName);
  };

  return (
    <li className="ml-2">
      <div
        className="flex justify-between items-center py-1 px-2 hover:bg-white/10 rounded cursor-pointer"
        onClick={() => node.type === "file" && openFile(node)}
      >
        <div className="flex items-center gap-2">
          {node.type === "folder" && (
            <button onClick={() => setExpanded(!expanded)} className="w-4">
              {expanded ? "▼" : "▶"}
            </button>
          )}
          <span className="select-none flex items-center gap-2">
            {node.type === "folder" ? <FaFolder /> : <FaFile />} {node.name}
          </span>
        </div>

        <FileMenu
          isFolder={node.type === "folder"}
          onDelete={() => deleteFile(node._id)}
          onRename={handleRenameFile}
          onCreate={handleCreateFile}
        />
      </div>

      {node.children.length > 0 && expanded && (
        <ul>
          {node.children.map((child) => (
            <FileTreeNode
              key={child._id}
              node={child}
              openFile={openFile}
              deleteFile={deleteFile}
              createFile={createFile}
              renameFile={renameFile}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default FileTreeNode;
