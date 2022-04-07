import React from "react";
import EditorRibbon from "./editorRibbon";
import EditorTextArea from "./editorTextArea";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { useMemo } from "react";

const withInlines = (editor) => {
  const { isInline } = editor;
  editor.isInline = (element) => element.type === "link" || isInline(element);
  return editor;
};
export default function Editor(props) {
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  );

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
