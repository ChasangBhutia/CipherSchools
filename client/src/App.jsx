import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPanel from "./pages/AuthPanel";
import Dashboard from "./pages/Dashboard";
import ProjectEditor from "./pages/ProjectEditor";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<AuthPanel />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/projects/:projectId" element={<ProjectEditor />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
