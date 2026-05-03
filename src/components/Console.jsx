import { useStore } from "../store/useStore";

export default function Console() {
  const output = useStore((state) => state.consoleOutput);

  return (
    <div className="p-3 text-sm bg-black h-full overflow-y-auto font-mono">
      {output.map((line, i) => (
        <p
          key={i}
          className={`${
            line.includes("Error")
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}