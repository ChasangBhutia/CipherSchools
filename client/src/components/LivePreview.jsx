import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

/**
 * @param {Object} props
 * @param {Object} props.files - { "/filename": "content" }
 */
export default function LivePreview({ files }) {
  return (
    <div className="flex-1 h-full">
      <SandpackProvider
        template="react"
        files={files}
        customSetup={{
          dependencies: {
            react: "18.2.0",
            "react-dom": "18.2.0",
          },
        }}
        options={{
          showTabs: false,
          showLineNumbers: false,
        }}
      >
        <SandpackLayout>
          <SandpackPreview
            style={{ height: "93vh", width: "100%", borderRadius: "8px" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
