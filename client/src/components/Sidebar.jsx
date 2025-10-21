import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileTreeNode from "./FileTreeNode";
import { FilePlus2, FolderPlus, X } from "lucide-react";
import { getLanguageFromFileName } from "../utils/getLanguageFromFileName";
import { useFileContext } from "../context/FileContext";

const Sidebar = ({
  project,
  fileTree,
  newFileName,
  setNewFileName,
  creating,
  openFile,
  deleteFile,
  createFileInFolder,
  renameFile,
  isOpen,
  onClose,
}) => {
  const { createNewFileOrFolder } = useFileContext();

  const createFile = (id) => {
    const parentId = localStorage.getItem("parentId");
    const language = getLanguageFromFileName(newFileName);
    const payload = {
      projectId: id,
      type: "file",
      name: newFileName,
      parentId: parentId === "" ? null : parentId,
      language,
    };
    createNewFileOrFolder(payload);
  };

  const createFolder = (id) => {
    const parentId = localStorage.getItem("parentId");
    const payload = {
      projectId: id,
      type: "folder",
      name: newFileName,
      parentId: parentId === "" ? null : parentId,
      language: null,
    };
    createNewFileOrFolder(payload);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -350 }}
        animate={{
          x: isOpen || window.innerWidth >= 1024 ? 0 : -350,
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 w-80 bg-white/5 backdrop-blur-md p-2 flex flex-col z-40
             lg:static lg:translate-x-0 lg:flex"
      >
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-xl font-bold">{project?.name || "Project"}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition"
          >
            <X />
          </button>
        </div>

        {/* Project name for large screens */}
        <h2 className="text-xl font-bold mb-4 hidden lg:block">
          {project?.name || "Project"}
        </h2>

        {/* New file/folder input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="New file/folder"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="flex-1 px-2 py-1 rounded bg-white/10 placeholder:text-slate-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => createFile(project._id)}
            disabled={creating}
            className="px-2 py-1 bg-indigo-600 rounded hover:bg-indigo-500 transition flex items-center gap-1"
          >
            <FilePlus2 />
          </button>
          <button
            onClick={() => createFolder(project._id)}
            disabled={creating}
            className="px-2 py-1 bg-pink-600 rounded hover:bg-pink-500 transition flex items-center gap-1"
          >
            <FolderPlus />
          </button>
        </div>

        {/* File tree */}
        <AnimatePresence>
          <ul className="flex-1 overflow-auto">
            {fileTree.map((node) => (
              <FileTreeNode
                key={node._id}
                projectId={project._id}
                node={node}
                openFile={openFile}
                deleteFile={deleteFile}
                createFile={createFileInFolder}
                renameFile={renameFile}
              />
            ))}
          </ul>
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Sidebar;
