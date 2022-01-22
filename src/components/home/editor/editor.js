import React from "react";
import EditorRibbon from "./editorRibbon";
import EditorTextArea from "./editorTextArea";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { useMemo } from "react";
export default function Editor(props) {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate
      editor={editor}
      value={props.value}
      onChange={(value) => props.onChange(value)}
    >
      <EditorRibbon />
      <EditorTextArea />
    </Slate>
  );
}
