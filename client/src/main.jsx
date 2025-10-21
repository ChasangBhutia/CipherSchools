import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProjectProvider } from "./context/ProjectContext.jsx";
import { FileProvider } from "./context/FileContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <FileProvider>
            <App />
          </FileProvider>
        </ProjectProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
