import React, { useCallback, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useFileContext } from "../context/FileContext";

const getLanguageFromFileName = (fileName) => {
  if (!fileName) return "javascript";
  const ext = fileName.split(".").pop();
  switch (ext) {
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "css":
      return "css";
    case "html":
      return "html";
    case "json":
      return "json";
    default:
      return "plaintext";
  }
};

const Editor = ({
  projectId,
  selectedFile,
  editorContent,
  setEditorContent,
}) => {
  const { updateFile } = useFileContext();

  const timeoutRef = useRef(null);
  const handleContentChange = useCallback(
    (value) => {
      setEditorContent(value);
      if (!selectedFile?._id) return; // ensure file has an ID
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        await updateFile(projectId, selectedFile._id, value);
      }, 3000); // saves 3s after user stops typing
    },
    [selectedFile, setEditorContent]
  );

  return (
    <div className="flex flex-col flex-1 border border-slate-700 rounded-md overflow-hidden">
      {/* 🧠 Header Bar */}
      {selectedFile && (
        <div className="flex items-center justify-between bg-[#1e1e1e] text-gray-200 px-4 py-2 border-b border-slate-700">
          <span className="font-mono text-sm">{selectedFile.name}</span>
        </div>
      )}

      {/* 🧩 Monaco Editor */}
      <div className="flex-1">
        {selectedFile ? (
          <MonacoEditor
            height="100%"
            language={getLanguageFromFileName(selectedFile.name)}
            value={editorContent}
            onChange={handleContentChange}
            theme="vs-dark"
            options={{
              automaticLayout: true,
              fontSize: 16,
              padding: { top: 20 },
              minimap: { enabled: false },
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            Select a file to edit
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
