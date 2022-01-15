import { useState } from "react";
import { MenuItem, Select, Typography } from "@mui/material";
import { useSlate } from "slate-react";
import { Transforms, Text } from "slate";

export default function FontPicker() {
  const editor = useSlate();
  const values = [
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Poppins",
    "dry brush",
    "Droid Sans",
    "Helvetica Neue",
    "sans serif",
  ];

  const [font, setfont] = useState(values[0]);

  const changedFont = (e) => {
    setfont(e.target.value);
    Transforms.setNodes(
      editor,
      { fontFamily: e.target.value },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  return (
    <Select
      variant="standard"
      disableUnderline
      value={font}
      onChange={changedFont}
      style={{ fontFamily: font, outline: "none", width: 100 }}
    >
      {values.map((e) => (
        <MenuItem key={e} value={e} style={{ fontFamily: e }}>
          <Typography variant={"subtitle2"}>{e}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
}
