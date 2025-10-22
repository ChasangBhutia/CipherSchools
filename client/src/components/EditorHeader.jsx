// src/components/EditorHeader.jsx
import React from "react";
import { Play, Square, Save } from "lucide-react";

const EditorHeader = ({
  selectedFile,
  fileSaving,
  onRun,
  onSave,
  isPreview,
  theme,
  setTheme,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1e1e1e] text-gray-200 px-4 py-2 border-b border-slate-700">
      <span className="font-mono text-sm truncate max-w-[150px] md:max-w-none">
        {selectedFile?.name || "No file selected"}
      </span>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Run / Stop */}
        {fileSaving ? (
          <button
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs md:text-sm font-medium transition ${
              isPreview
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled
          >
            Saving...
          </button>
        ) : (
          <button
            onClick={onRun}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs md:text-sm font-medium transition ${
              isPreview
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isPreview ? <Square size={14} /> : <Play size={14} />}
            {isPreview ? "Stop" : "Run"}
          </button>
        )}

        {/* Save */}
        <button
          onClick={onSave}
          className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-xs md:text-sm font-medium"
        >
          <Save size={14} />
          Save
        </button>

        {/* Theme Selector */}
        <select
          className=" bg-slate-800 text-white px-2 py-1 rounded text-xs md:text-sm"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="vs-dark">Dark</option>
          <option value="vs-light">Light</option>
          <option value="hc-black">High Contrast</option>
        </select>
      </div>
    </div>
  );
};

export default EditorHeader;
