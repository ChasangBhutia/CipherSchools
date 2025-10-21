const fileModel = require("../models/fileModel");

module.exports.createReactBoilerplate = async (projectId, slug) => {
  // 1️⃣ Root package.json
  await fileModel.create({
    projectId,
    parentId: null,
    name: "package.json",
    type: "file",
    language: "json",
    content: `{
  "name": "${slug}",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "start": "vite",
    "build": "vite build"
  }
}`,
  });

  // 2️⃣ public folder with index.html
  const publicFolder = await fileModel.create({
    projectId,
    parentId: null,
    name: "public",
    type: "folder",
  });

  await fileModel.create({
    projectId,
    parentId: publicFolder._id,
    name: "index.html",
    type: "file",
    language: "html",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${slug}</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  });

  // 3️⃣ src folder
  const srcFolder = await fileModel.create({
    projectId,
    parentId: null,
    name: "src",
    type: "folder",
  });

  // src/App.jsx
  await fileModel.create({
    projectId,
    parentId: srcFolder._id,
    name: "App.jsx",
    type: "file",
    language: "jsx",
    content: `import React from 'react';
import './style.css';

function App() {
  return (
    <div className="app">
      <h1>Hello, ${slug}!</h1>
    </div>
  );
}

export default App;`,
  });

  // src/index.jsx
  await fileModel.create({
    projectId,
    parentId: srcFolder._id,
    name: "index.jsx",
    type: "file",
    language: "jsx",
    content: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`,
  });

  // src/style.css
  await fileModel.create({
    projectId,
    parentId: srcFolder._id,
    name: "style.css",
    type: "file",
    language: "css",
    content: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
.app {
  padding: 2rem;
  text-align: center; 
}`,
  });
};
