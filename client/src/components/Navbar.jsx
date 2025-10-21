import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onToggleSidebar }) {
  const { user } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-4 border-b border-slate-800 bg-slate-900 relative">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </button>
        )}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          <Link to="/">CipherStudio</Link>
        </motion.h1>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {user.firstName ? (
          <div className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition">
            {user.firstName}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition"
          >
            Login
          </Link>
        )}
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/"
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition"
        >
          Home
        </Link>
      </div>

      <button
        className="md:hidden p-2 text-gray-300 hover:text-white transition"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
            />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 md:hidden z-50"
          >
            <div className="flex flex-col px-4 py-3 space-y-2">
              {user.firstName ? (
                <div className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition text-center">
                  {user.firstName}
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition text-center"
                >
                  Login
                </Link>
              )}
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition text-center"
              >
                Dashboard
              </Link>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition text-center"
              >
                Home
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
