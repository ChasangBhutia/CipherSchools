# CipherStudio

**CipherStudio** is a browser-based React development environment that allows users to create, edit, and preview React components live in the browser. It simulates a real IDE experience with live preview, file management, and project persistence.

**Live url:** https://cipherstudio-omega.vercel.app/

---

## Features

- Create and manage multiple React files and folders
- Live preview of React components
- Code editor with syntax highlighting
- Save and reload projects
- Supports functional components and hooks
- User authentication (optional)

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB
- **Editor:** Monaco Editor / CodeSandpack
- **Deployment:** Vercel / Render

---

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ChasangBhutia/CipherSchools.git
cd CipherSchools
```

2. Install dependencies:

```bash
cd client
npm install

cd server
npm install

```

3. Set environment variables:

### client

```bash
VITE_BACKEND_URI=http://localhost:3000
```

### server

```bash
PORT = 3000
MONGODB_URI = your_mongodb-connection
JWT_SECRET_KEY = your-secret_key
NODE_ENV = "development"
CLIENT_URI = "http://localhost:5173"
```

4. Start development servers:

### client

```bash
cd client
npm run dev
```

### server

```bash
cd server
node index.js
```

## Folder Structure

```bash
CipherSchools/
├─ client/
│ ├─ src/
│ ├─ public/
│ ├─ package.json
├─ server/
│ ├─ routes/
│ ├─ controllers/
│ ├─ models/
│ ├─ index.js
│ ├─ package.json
├─ README.md
```

## Architecture Overview

```bash
+---------------------+
| ReactIDE UI | <- Frontend (React + Tailwind)
+---------+-----------+
|
v
+---------------------+
| API Layer / Axios | <- Handles requests to backend
+---------+-----------+
|
v
+---------------------+
| Node.js / Express | <- Backend server
+---------+-----------+
|
v
+---------------------+
| MongoDB DB | <- Stores projects, user data
+---------------------+
```

- **Frontend** handles the editor, file management, and live preview.
- **Axios/API layer** connects frontend to backend.
- **Backend** handles authentication, project persistence, and APIs.
- **Database** stores projects, users, and other persistent data.
