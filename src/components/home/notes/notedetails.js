import React from "react";
import { Stack, Fade } from "@mui/material";
import Editor from "../editor/editor";
import NoteMetaData from "./noteMetaData";
import NoteUnselected from "./noteUnselected";
import { useState } from "react";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import NoteNavBar from "./noteNavBar";

export default function NoteDetails() {
  const [editor, setEditor] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const { selected, note } = useNoteDetailed();
  return selected ? (
    <Fade in timeout={1200}>
      <Stack
        direction={"column"}
        sx={{
          p: 0,
          height: "90vh",
          overflowY: "scroll",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        <NoteNavBar heading={note.heading} createdAt={note.createdAt} />
        <NoteMetaData
          tags={note.tags}
          updatedAt={note.updatedAt}
          createdAt={note.createdAt}
        />

        <Editor
          value={note.note}
          style={{ margin: "0px 20px" }}
          onChange={(e) => setEditor(e)}
        />
      </Stack>
    </Fade>
  ) : (
    <NoteUnselected />
  );
}
