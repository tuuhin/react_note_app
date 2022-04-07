import React from "react";
import { Divider, Grid, IconButton } from "@mui/material";
import { useSlate } from "slate-react";
import { Transforms, Text, Editor } from "slate";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdUndo,
  MdRedo,
  MdCode,
} from "react-icons/md";

import {
  TypographySelector,
  FontSelector,
  // ColorPicker,
  // AddLink,
  // ImagePicker,
} from "./selectors";

export default function EditorRibbon() {
  const editor = useSlate();
  const Bold = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });
    Transforms.setNodes(
      editor,
      { bold: match ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  const Italic = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true,
    });
    Transforms.setNodes(
      editor,
      { italic: match ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  const Underlined = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underlined === true,
      universal: true,
    });
    Transforms.setNodes(
      editor,
      { underlined: match ? null : true, lineThrough: null },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  const LineThrough = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.lineThrough === true,
      universal: true,
    });
    Transforms.setNodes(
      editor,
      { lineThrough: match ? null : true, underlined: null },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  const OrderedList = () => {
    const [isActive] = Editor.nodes(editor, {
      match: (n) => n.type === "ordered-list",
    });

    Transforms.unwrapNodes(editor, {
      match: (n) => n.type === "unordered-list" || n.type === "ordered-list",
      split: true,
    });
    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : "list-item",
    });
    if (!isActive) {
      Transforms.wrapNodes(editor, {
        type: "ordered-list",
        children: [],
      });
    }
  };

  const blockCode = () => {
    const [isActive] = Editor.nodes(editor, {
      match: (n) => n.type === "block-quote",
    });
    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : "block-quote",
    });
  };

  const UnOrderedList = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "unordered-list",
    });

    Transforms.unwrapNodes(editor, {
      match: (n) => n.type === "unordered-list" || n.type === "ordered-list",
      split: true,
    });
    Transforms.setNodes(editor, {
      type: match ? "paragraph" : "list-item",
    });

    if (!match) {
      Transforms.wrapNodes(editor, {
        type: "unordered-list",
        children: [],
      });
    }
  };

  const undo = () => editor.undo();

  const redo = () => editor.redo();

  return (
    <>
      <Divider variant="middle" />
      <Grid
        sx={{ mt: "1px" }}
        container
        spacing={1}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item>
          <IconButton onClick={undo} disabled={!editor.history.undos.length}>
            <MdUndo />
          </IconButton>
          <IconButton onClick={redo} disabled={!editor.history.redos.length}>
            <MdRedo />
          </IconButton>
        </Grid>
        <Grid item>
          <TypographySelector />
          <FontSelector />
        </Grid>
        <Grid item>
          <IconButton onClick={Bold}>
            <MdFormatBold />
          </IconButton>
          <IconButton onClick={Italic}>
            <MdFormatItalic />
          </IconButton>
          <IconButton onClick={Underlined}>
            <MdFormatUnderlined />
          </IconButton>
          <IconButton onClick={LineThrough}>
            <MdFormatStrikethrough />
          </IconButton>
          {/* <ColorPicker />
        <AddLink /> */}
          <IconButton onClick={blockCode}>
            <MdCode />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={UnOrderedList}>
            <MdFormatListBulleted />
          </IconButton>
          <IconButton onClick={OrderedList}>
            <MdFormatListNumbered />
          </IconButton>
          {/* <ImagePicker /> */}
        </Grid>
      </Grid>
      <Divider variant="middle" />
    </>
  );
}
