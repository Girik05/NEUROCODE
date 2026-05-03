import { create } from "zustand";

export const useStore = create((set) => ({
  // ================= UI STATE =================
  showAI: true,
  showConsole: true,
  showFiles: true,

  toggleAI: () =>
    set((state) => ({ showAI: !state.showAI })),

  toggleConsole: () =>
    set((state) => ({ showConsole: !state.showConsole })),

  toggleFiles: () =>
    set((state) => ({ showFiles: !state.showFiles })),

  // ================= FILE SYSTEM =================
  files: {
    "App.js": 'console.log("Hello World");',
    "index.html": "<h1>Hello</h1>",
    "style.css": "body { background: black; }",
  },

  activeFile: "App.js",
  openTabs: ["App.js"],
  code: 'console.log("Hello World");',

  // Open file
  openFile: (file) =>
    set((state) => ({
      activeFile: file,
      code: state.files[file],
      openTabs: state.openTabs.includes(file)
        ? state.openTabs
        : [...state.openTabs, file],
    })),

  // Close tab
  closeFile: (file) =>
    set((state) => {
      const newTabs = state.openTabs.filter((f) => f !== file);

      return {
        openTabs: newTabs,
        activeFile: newTabs[0] || "",
        code: newTabs[0] ? state.files[newTabs[0]] : "",
      };
    }),

  // Update code
  setCode: (newCode) =>
    set((state) => ({
      code: newCode,
      files: {
        ...state.files,
        [state.activeFile]: newCode,
      },
    })),

  // 🔥 Add file (USED FOR DRAG & DROP + NEW FILE)
  addFile: (name, content = "") =>
    set((state) => ({
      files: {
        ...state.files,
        [name]: content,
      },
      activeFile: name,        // 🔥 auto open
      code: content,
      openTabs: state.openTabs.includes(name)
        ? state.openTabs
        : [...state.openTabs, name],
    })),

  // ================= CONSOLE =================
  consoleOutput: ["> Ready..."],

  runCode: (code) =>
    set(() => {
      let output = ["> Running..."];

      try {
        // Syntax validation
        new Function(code);

        const logs = [];
        const originalLog = console.log;

        console.log = (...args) => {
          logs.push(args.join(" "));
        };

        // Execute code
        eval(code);

        console.log = originalLog;

        if (logs.length === 0) {
          output.push("No output");
        } else {
          output.push(...logs);
        }

        output.push("> Done");
      } catch (err) {
        output.push("❌ Error:");
        output.push(err.message);
      }

      return { consoleOutput: output };
    }),
}));