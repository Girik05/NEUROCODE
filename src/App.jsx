import { useState, useRef } from "react";
import FileExplorer from "./components/FileExplorer";
import Editor from "./components/Editor";
import AIPanel from "./components/AIPanel";
import { useStore } from "./store/useStore";

export default function App() {
  const [showFiles, setShowFiles] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  const [dragging, setDragging] = useState(false);
  const dragCounter = useRef(0);

  const addFile = useStore((s) => s.addFile);

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current++;
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDragging(false);

    const files = e.dataTransfer.files;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        addFile(file.name, event.target.result);
      };
      reader.readAsText(file);
    });
  };

  return (
    <div
      className="h-screen flex flex-col bg-[#020617] text-white overflow-hidden"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* NAVBAR */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
          NEUROCODE
        </h1>

        <p className="text-sm text-gray-400">
          AI-assisted development with real-time insights
        </p>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setShowFiles((p) => !p)}
            className="px-3 py-1 bg-gray-800 rounded hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition"
          >
            Files
          </button>

          <button
            onClick={() => setShowAI((p) => !p)}
            className="px-3 py-1 bg-gray-800 rounded hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition"
          >
            AI Chat
          </button>

          <button
            onClick={() => setShowConsole((p) => !p)}
            className="px-3 py-1 bg-gray-800 rounded hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition"
          >
            Console
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 relative overflow-hidden">

        {/* EDITOR SHIFT */}
        <div
          className={`absolute top-0 bottom-0 transition-all duration-300 ${
            showFiles ? "left-[260px]" : "left-0"
          } ${showAI ? "right-[320px]" : "right-0"}`}
        >
          <Editor />
        </div>

        {/* FILES PANEL */}
        <div
          className={`absolute top-0 left-0 h-full w-[260px] bg-[#020617] border-r border-gray-800 shadow-lg shadow-blue-500/20 transform transition-transform duration-300 ${
            showFiles ? "translate-x-0" : "-translate-x-full"
          } z-20`}
        >
          <FileExplorer />
        </div>

        {/* AI PANEL */}
        <div
          className={`absolute top-0 right-0 h-full w-[320px] bg-[#020617] border-l border-gray-800 shadow-lg shadow-purple-500/20 transform transition-transform duration-300 ${
            showAI ? "translate-x-0" : "translate-x-full"
          } z-20`}
        >
          <AIPanel />
        </div>

        {/* DRAG OVERLAY */}
        {dragging && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
            <div className="text-blue-400 text-lg border border-blue-500 px-6 py-3 rounded-lg">
              Drop file to open
            </div>
          </div>
        )}
      </div>

      {/* CONSOLE */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[150px] bg-black text-green-400 p-2 text-sm border-t border-gray-800 transform transition-transform duration-300 ${
          showConsole ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <p>&gt; Ready...</p>
      </div>
    </div>
  );
}