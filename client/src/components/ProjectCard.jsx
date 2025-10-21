import React from "react";
import { motion } from "framer-motion";
import { FaTrash, FaFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProjectContext } from "../context/ProjectContext";

const ProjectCard = ({ id, name, updatedAt, createdAt }) => {
  const navigate = useNavigate();
  const { deleteProject } = useProjectContext();

  const cardVariant = {
    hidden: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const openProject = (projectId) => {
    localStorage.setItem("projectId", projectId);
    navigate(`/projects/${projectId}`);
  };

  const handleDelete = (projectId) => {
    if (localStorage.getItem("projectId") === projectId)
      localStorage.setItem("projectId", "");
    deleteProject(projectId);
  };

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="enter"
      exit="exit"
      className="bg-white/6 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/10 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
        <p className="text-sm text-slate-300">
          Created At: {new Date(createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-slate-300">
          Last updated: {new Date(updatedAt).toLocaleString()}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => openProject(id)}
          className="px-3 py-1 rounded-lg bg-indigo-600/80 text-white flex items-center gap-2 hover:bg-indigo-600 transition"
        >
          <FaFolderOpen /> Open
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="px-3 py-1 rounded-lg bg-red-600/80 text-white flex items-center gap-2 hover:bg-red-600 transition"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
