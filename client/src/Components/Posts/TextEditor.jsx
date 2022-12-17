import React, { useState, useRef } from "react";
import JoditEditor, { Jodit } from "jodit-react";

const TextEditor = () => {
  const [content, setContent] = useState("");
  const editor = useRef(null);

  const config = {
    readonly: false,
    enableDragAndDropFileToEditor: true,
    placeholder: "Escriba aqui por favor...",
    height: "450px",
    width: "100%",
    removeButtons: ["brush", "file", "copyformat"],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: true,
    toolbarSticky: true,
  };

  return (
    <JoditEditor
      ref={editor}
      config={config}
      value={content}
      tabIndex={1} // tabIndex of textarea
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default TextEditor;
