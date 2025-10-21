import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCode, FaBolt, FaCloud, FaLock } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between overflow-hidden">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-5 border-b border-slate-800">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          CipherStudio
        </motion.h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 mt-20">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-6"
        >
          Code. Compile. Create.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-slate-400 max-w-2xl mb-10"
        >
          A modern browser-based IDE to build, preview, and manage React
          projects — all in one place. Powered by the MERN stack.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/register"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold hover:scale-105 transition-transform"
          >
            Start Building
          </Link>
          <a
            href="#features"
            className="px-6 py-3 border border-slate-700 rounded-xl font-semibold hover:bg-slate-800 transition"
          >
            Learn More
          </a>
        </motion.div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="grid md:grid-cols-4 gap-6 px-8 py-16 w-full max-w-6xl text-center"
      >
        {[
          {
            icon: <FaCode />,
            title: "Smart Code Editor",
            desc: "Monaco-powered editor with real-time preview.",
          },
          {
            icon: <FaBolt />,
            title: "Instant Preview",
            desc: "See your React code live as you type.",
          },
          {
            icon: <FaCloud />,
            title: "Cloud Projects",
            desc: "Save and access your code anywhere.",
          },
          {
            icon: <FaLock />,
            title: "Secure Login",
            desc: "MERN-based auth with JWT & encryption.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition"
          >
            <div className="text-3xl mb-4 text-cyan-400">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
        Built with 💙 using React, Tailwind & Framer Motion — ©{" "}
        {new Date().getFullYear()} CipherStudio
      </footer>
    </div>
  );
}
