import React from "react";
import { Play, Square, Save, Upload } from "lucide-react";

export default function Navbar({ onRun, onSave, onDeploy, isPreview }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 h-[7vh]">
      <h1 className="text-lg font-semibold text-white">CipherStudio</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={onRun}
          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition ${
            isPreview
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isPreview ? <Square size={16} /> : <Play size={16} />}
          {isPreview ? "Stop" : "Run"}
        </button>

        <button
          onClick={onSave}
          className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
        >
          <Save size={16} />
          Save
        </button>
      </div>
    </div>
  );
}
