import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useSlate } from "slate-react";
import { Transforms, Editor } from "slate";
export default function ParagraphPicker() {
  const editor = useSlate();
  const paragraphs = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "caption",
    "overline",
  ];

  const [currentmode, setmode] = useState(paragraphs[0]);

  const changeMode = (e) => {
    setmode(e.target.value);
    Transforms.setNodes(
      editor,
      { type: "typography", typoMode: e.target.value },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  };

  return (
    <Select
      value={currentmode}
      onChange={changeMode}
      sx={{ width: 100 }}
      variant="standard"
      disableUnderline
    >
      {paragraphs.map((e) => (
        <MenuItem key={e} value={e}>
          {e}
        </MenuItem>
      ))}
    </Select>
  );
}
