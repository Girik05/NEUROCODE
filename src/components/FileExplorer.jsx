import { useStore } from "../store/useStore";

export default function FileExplorer() {
  const files = useStore((s) => s.files);
  const openFile = useStore((s) => s.openFile);
  const activeFile = useStore((s) => s.activeFile);
  const addFile = useStore((s) => s.addFile);

  return (
    <div className="p-3 text-sm h-full">

      <button
        onClick={() => {
          const name = prompt("Enter file name");
          if (name) addFile(name, "");
        }}
        className="mb-3 px-2 py-1 bg-blue-500 rounded"
      >
        + New File
      </button>

      <div className="space-y-2">
        {Object.keys(files).map((file) => (
          <div
            key={file}
            onClick={() => openFile(file)}
            className={`p-2 rounded cursor-pointer ${
              activeFile === file
                ? "bg-blue-500/20"
                : "hover:bg-gray-700/40"
            }`}
          >
            {file}
          </div>
        ))}
      </div>
    </div>
  );
}