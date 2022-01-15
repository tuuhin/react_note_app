import React from "react";
import { Divider, Grid, IconButton } from "@mui/material";
import { useSlate } from "slate-react";
import { Transforms, Text, Editor } from "slate";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatListNumbered,
  MdFormatListBulleted,
} from "react-icons/md";

import FontPicker from "./fontPicker";
import ParagraphPicker from "./paragraph";
import { Box } from "@mui/system";

export default function EditorOptionBar() {
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

  const AlignLeft = () => {};

  const AlignCenter = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.alignment === "center",
    });
    Transforms.setNodes(editor, {
      alignment: match ? "flex-start" : "center",
      match: (n) => Editor.isBlock(editor, n),
    });
  };
  const AlignRight = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.alignment === "flex-end",
    });
    Transforms.setNodes(editor, {
      alignment: match ? "flex-start" : "flex-end",
      match: (n) => Editor.isBlock(editor, n),
    });
  };

  return (
    <Grid
      style={{
        marginTop: "1px",
        borderTop: "1px solid rgba(170, 169, 169, 0.74)",
      }}
      container
      spacing={2}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid item>
        <ParagraphPicker />
      </Grid>
      <Grid item>
        <FontPicker />
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
      </Grid>
      <Grid item>
        <IconButton onClick={UnOrderedList}>
          <MdFormatListBulleted />
        </IconButton>
        <IconButton onClick={OrderedList}>
          <MdFormatListNumbered />
        </IconButton>
        <Divider orientation="vertical" />
      </Grid>

      <Divider orientation="vertical" />
      <Grid item>
        <IconButton onClick={AlignLeft}>
          <MdFormatAlignLeft />
        </IconButton>
        <IconButton onClick={AlignCenter}>
          <MdFormatAlignCenter />
        </IconButton>
        <IconButton onClick={AlignRight}>
          <MdFormatAlignRight />
        </IconButton>
        <Divider orientation="vertical" />
      </Grid>
    </Grid>
  );
}
