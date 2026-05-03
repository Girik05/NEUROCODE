import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const runCode = useStore((state) => state.runCode);
  const code = useStore((state) => state.code);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const openFile = useStore((state) => state.openFile);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleCommand = () => {
    const cmd = input.toLowerCase();

    if (cmd.includes("run")) {
      runCode(code);
    } else if (cmd.includes("theme")) {
      toggleTheme();
    } else {
      openFile(input);
    }

    setInput("");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-[#020617] p-4 rounded-xl w-[400px] shadow-lg border border-blue-500">
        <input
          autoFocus
          className="w-full p-2 bg-black text-white rounded outline-none"
          placeholder="Type a command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommand()}
        />
      </div>
    </div>
  );
}