import Editor from "@monaco-editor/react";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onCodeChange,
}) {
  return (
    <div className="h-full bg-[#0C0C18]">
      <Editor
        height="100%"
        language={selectedLanguage}
        value={code}
        onChange={onCodeChange}
        theme="vs-dark"
        options={{
          fontSize: 15,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          minimap: { enabled: false },
          padding: { top: 12 },
          smoothScrolling: true,
          cursorSmoothCaretAnimation: "on",
        }}
      />
    </div>
  );
}

export default CodeEditorPanel;