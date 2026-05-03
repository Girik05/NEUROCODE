import MonacoEditor from "@monaco-editor/react";
import { useStore } from "../store/useStore";

export default function Editor() {
  const { code, setCode } = useStore();

  return (
    <div className="h-full w-full overflow-hidden relative">

      {/* 🔥 CLAMP CONTAINER */}
      <div className="absolute inset-0 overflow-hidden">
        <MonacoEditor
          height="100%"
          width="100%"
          language="javascript"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

    </div>
  );
}