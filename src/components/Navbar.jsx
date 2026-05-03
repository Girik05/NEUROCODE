import { useStore } from "../store/useStore";

export default function Navbar() {
  const toggleAI = useStore((s) => s.toggleAI);
  const toggleConsole = useStore((s) => s.toggleConsole);
  const toggleFiles = useStore((s) => s.toggleFiles);

  return (
    <div className="px-6 pt-6 pb-4 border-b border-blue-500/10 bg-[#020617]">
      <h1 className="text-3xl font-bold mb-2">NEUROCODE</h1>

      <div className="flex gap-3 mt-3">
        <button
          onClick={toggleFiles}
          className="px-3 py-1 rounded bg-[#0f172a]"
        >
          Files
        </button>

        <button
          onClick={toggleAI}
          className="px-3 py-1 rounded bg-[#0f172a]"
        >
          AI Chat
        </button>

        <button
          onClick={toggleConsole}
          className="px-3 py-1 rounded bg-[#0f172a]"
        >
          Console
        </button>
      </div>
    </div>
  );
}