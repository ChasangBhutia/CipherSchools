import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import FileTreeNode from "./FileTreeNode";
import { FilePlus2, FolderPlus } from "lucide-react";

const Sidebar = ({
  project,
  loading,
  fileTree,
  newFileName,
  setNewFileName,
  creating,
  createFileAtRoot,
  openFile,
  deleteFile,
  createFileInFolder,
  renameFile,
}) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.4 } }}
      className="w-80 bg-white/5 backdrop-blur-md p-2 flex flex-col"
    >
      <h2 className="text-xl font-bold mb-4">{project?.name || "Project"}</h2>

      {/* New file/folder at root */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New file/folder"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          className="flex-1 px-2 py-1 rounded bg-white/10 placeholder:text-slate-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => createFileAtRoot("file")}
          disabled={creating}
          className="px-2 py-1 bg-indigo-600 rounded hover:bg-indigo-500 transition flex items-center gap-1"
        >
          <FilePlus2 />
        </button>
        <button
          onClick={() => createFileAtRoot("folder")}
          disabled={creating}
          className="px-2 py-1 bg-pink-600 rounded hover:bg-pink-500 transition flex items-center gap-1"
        >
          <FolderPlus />
        </button>
      </div>

      {/* File tree */}
      <AnimatePresence>
        <ul className="flex-1 overflow-auto">
          {loading ? (
            <p>Loading files...</p>
          ) : (
            fileTree.map((node) => (
              <FileTreeNode
                key={node._id}
                node={node}
                openFile={openFile}
                deleteFile={deleteFile}
                createFile={createFileInFolder}
                renameFile={renameFile}
              />
            ))
          )}
        </ul>
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;
