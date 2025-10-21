import { useState } from "react";

const FileMenu = ({
  isFolder,
  onDelete,
  onRename,
  onCreateFile,
  onCreateFolder,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="px-1 py-1 hover:bg-white/10 rounded"
      >
        ⋮
      </button>

      {open && (
        <ul className="absolute right-0 mt-1 bg-slate-800 text-white rounded shadow-lg z-10 w-32">
          {isFolder && (
            <>
              <li
                className="px-2 py-1 hover:bg-slate-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateFolder(); // call folder creation
                  setOpen(false);
                }}
              >
                Create Folder
              </li>
              <li
                className="px-2 py-1 hover:bg-slate-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateFile(); // call file creation
                  setOpen(false);
                }}
              >
                Create File
              </li>
            </>
          )}

          <li
            className="px-2 py-1 hover:bg-slate-700 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRename();
              setOpen(false);
            }}
          >
            Rename
          </li>
          <li
            className="px-2 py-1 hover:bg-slate-700 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setOpen(false);
            }}
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
};

export default FileMenu;
