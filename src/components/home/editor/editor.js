import React from "react";
import EditorOptionBar from "./editorOptionBar";
import EditorTextArea from "./editorTextArea";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { useMemo, useState } from "react";
import { Button } from "@mui/material";
export default function Editor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [
        { text: "This is editable " },
        { text: "rich", bold: true },
        { text: " text, " },
        { text: "much", italic: true },
        { text: " better than a " },
        { text: "<textarea>", code: true },
        { text: "!" },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: "bold", bold: true },
        {
          text: ", or add a semantically rendered block quote in the middle of the page, like this:",
        },
      ],
    },
    {
      type: "block-quote",
      children: [{ text: "A wise quote." }],
    },
    {
      type: "paragraph",
      children: [{ text: "Try it out for yourself!" }],
    },
  ]);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <EditorOptionBar />
      <EditorTextArea />
    </Slate>
  );
}
