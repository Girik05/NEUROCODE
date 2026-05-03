import { useState } from "react";
import { useStore } from "../store/useStore";

export default function AIPanel() {
  const code = useStore((state) => state.code);

  const [messages, setMessages] = useState([
    { text: "NeuroCode AI ready.", sender: "ai" },
  ]);

  const [input, setInput] = useState("");
  const [typingText, setTypingText] = useState("");

  const explainCode = () => {
    if (!code.trim()) return;

    let explanation = "Analyzing code...";

    if (code.includes("console.log"))
      explanation = "This prints output to the console.";
    else if (code.includes("function"))
      explanation = "This defines a reusable function.";
    else if (code.includes("return"))
      explanation = "This returns a value from a function.";

    let i = 0;
    setTypingText("");

    const interval = setInterval(() => {
      setTypingText((prev) => prev + explanation[i]);
      i++;
      if (i >= explanation.length) {
        clearInterval(interval);
        setMessages((prev) => [
          ...prev,
          { text: explanation, sender: "ai" },
        ]);
        setTypingText("");
      }
    }, 15);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text: input, sender: "user" },
      { text: "Got it 👍", sender: "ai" },
    ]);

    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-3 bg-[#020617]">

      <button
        onClick={explainCode}
        className="mb-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-sm hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition"
      >
         Explain Current Code
      </button>

      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded text-sm max-w-[85%] ${
              msg.sender === "ai"
                ? "bg-blue-600/80"
                : "bg-gray-700 ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {typingText && (
          <div className="text-blue-400 text-sm animate-pulse">
            {typingText}
          </div>
        )}
      </div>

      <div className="flex gap-2 w-full">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI anything..."
          className="flex-1 p-2 bg-black text-white rounded text-sm outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="px-3 bg-blue-500 rounded text-sm hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}