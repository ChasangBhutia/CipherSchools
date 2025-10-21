import React, { useCallback, useRef, useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useFileContext } from "../context/FileContext";
import * as monaco from "monaco-editor";
import EditorHeader from "./EditorHeader";
import Preview from "./LivePreview";

const getLanguageFromFileName = (fileName) => {
  if (!fileName) return "javascript";
  const ext = fileName.split(".").pop();
  switch (ext) {
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "css":
      return "css";
    case "html":
      return "html";
    case "json":
      return "json";
    default:
      return "plaintext";
  }
};

const Editor = ({
  files,
  projectId,
  selectedFile,
  editorContent,
  setEditorContent,
  onRun,
  onSave,
  isPreview,
}) => {
  const { fileSaving, setFileSaving, updateFile } = useFileContext();
  const [theme, setTheme] = useState("vs-dark");
  const timeoutRef = useRef(null);

  const handleContentChange = useCallback(
    (value) => {
      setFileSaving(true);
      setEditorContent(value);
      if (!selectedFile?._id) return;
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        await updateFile(projectId, selectedFile._id, value);
      }, 3000);
    },
    [selectedFile, setEditorContent, projectId, updateFile]
  );

  useEffect(() => {
    if (!monaco) return;

    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: (model, position) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });
        const match = textUntilPosition.match(/<([a-zA-Z]*)$/);
        if (!match) return { suggestions: [] };
        const tag = match[1];
        if (!tag) return { suggestions: [] };
        return {
          suggestions: [
            {
              label: tag,
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<${tag}>$0</${tag}>`,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: `Auto-close <${tag}> tag`,
            },
          ],
        };
      },
    });

    monaco.languages.registerCompletionItemProvider("html", {
      provideCompletionItems: () => {
        const tags = [
          "div",
          "p",
          "span",
          "h1",
          "h2",
          "h3",
          "ul",
          "li",
          "button",
        ];
        const suggestions = tags.map((tag) => ({
          label: tag,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: `<${tag}>$0</${tag}>`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: `Auto-close <${tag}> tag`,
        }));
        return { suggestions };
      },
    });
  }, []);

  return (
    <div className="flex flex-col flex-1 border border-slate-700 rounded-md overflow-hidden">
      {selectedFile && (
        <EditorHeader
          selectedFile={selectedFile}
          fileSaving={fileSaving}
          onRun={onRun}
          onSave={onSave}
          isPreview={isPreview}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      <div className="flex-1">
        {isPreview && <Preview files={files} />}
        {selectedFile ? (
          <MonacoEditor
            height="100%"
            language={getLanguageFromFileName(selectedFile.name)}
            value={editorContent}
            onChange={handleContentChange}
            theme={theme}
            options={{
              automaticLayout: true,
              fontSize: 16,
              padding: { top: 20 },
              minimap: { enabled: false },
              autoClosingBrackets: "always",
              autoClosingQuotes: "always",
              autoIndent: "advanced",
              formatOnType: true,
              tabCompletion: "on",
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            Select a file to edit
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
