import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useProjectContext } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { createNewProject, projects, loading } = useProjectContext();
  const [newProjectName, setNewProjectName] = useState("");
  const [creating, setCreating] = useState(false);

  const createProject = () => {
    if (!newProjectName) return;
    setCreating(true);
    createNewProject(newProjectName);
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6 } }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
            Your Projects
          </h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/5 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={createProject}
              disabled={creating}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold flex items-center gap-2"
            >
              <FaPlus /> {creating ? "Creating..." : "Create"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-800 text-white font-semibold flex items-center gap-2"
            >
              Home
            </button>
          </div>
        </div>

        <AnimatePresence>
          {loading ? (
            <div className="text-white">Loading projects...</div>
          ) : projects.length === 0 ? (
            <motion.div
              key="empty"
              variants={cardVariant}
              initial="hidden"
              animate="enter"
              exit="exit"
              className="text-white"
            >
              No projects found. Create one to start coding!
            </motion.div>
          ) : (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  id={project._id}
                  name={project.name}
                  createdAt={project.createdAt}
                  updatedAt={project.updatedAt}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
