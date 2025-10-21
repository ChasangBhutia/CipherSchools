import React from "react";

const SaveToolbar = ({ selectedFile, saveFile }) => {
  return (
    <div className="flex p-2 bg-white/5 border-t border-white/10 justify-between">
      <button
        onClick={saveFile}
        className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 transition"
      >
        Save
      </button>
      <span>{selectedFile ? selectedFile.name : ""}</span>
    </div>
  );
};

export default SaveToolbar;
