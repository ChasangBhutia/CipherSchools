import React, { useState, useEffect } from "react";

const RenamePrompt = ({ currentName, type = "file", onSubmit, onCancel }) => {
  const [name, setName] = useState(currentName || "");

  useEffect(() => {
    setName(currentName || "");
  }, [currentName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-4 rounded shadow-md w-80"
      >
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">
          Rename {type}
        </h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`Enter new ${type} name`}
          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mb-4 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700"
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Rename
          </button>
        </div>
      </form>
    </div>
  );
};

export default RenamePrompt;
