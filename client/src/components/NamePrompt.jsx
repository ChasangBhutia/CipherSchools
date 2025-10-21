import React, { useState } from "react";

const NamePrompt = ({ type = "file", onSubmit, onCancel }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // send data back to FileTreeNode
    onSubmit(name.trim());
    setName("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-4 rounded shadow-md w-80"
      >
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">
          Enter {type} name
        </h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`Enter ${type} name`}
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
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NamePrompt;
