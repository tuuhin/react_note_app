import { useState } from "react";
import { MenuItem, Select, Typography } from "@mui/material";
import { useSlate } from "slate-react";
import { Transforms, Text, Editor } from "slate";

export function FontSelector() {
  const editor = useSlate();
  const availableFonts = [
    "Roboto",
    "sans serif",
    "Open Sans",
    "Oxygen",
    "Ubuntu",
    "Poppins",
    "Source Serif Pro",
  ];

  const [font, setfont] = useState(availableFonts[0]);

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
      sx={{ outline: "none", width: 120, textAlign: "center" }}
    >
      {availableFonts.map((fontFamily) => (
        <MenuItem key={fontFamily} value={fontFamily}>
          <Typography variant={"subtitle2"} sx={{ fontFamily: fontFamily }}>
            {fontFamily}
          </Typography>
        </MenuItem>
      ))}
    </Select>
  );
}

export function TypographySelector() {
  const editor = useSlate();
  const variants = [
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "caption",
    "overline",
  ];

  const [variant, setVariant] = useState(variants[0]);

  const changeMode = (e) => {
    setVariant(e.target.value);
    Transforms.setNodes(editor, {
      type: "typography",
      typoMode: e.target.value,
      match: (n) => Editor.isBlock(editor, n),
    });
  };

  return (
    <Select
      value={variant}
      onChange={changeMode}
      sx={{ outline: "none", width: 120, textAlign: "center" }}
      variant="standard"
      disableUnderline
    >
      {variants.map((variant) => (
        <MenuItem key={variant} value={variant}>
          <Typography variant={variant}>{variant}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
}
