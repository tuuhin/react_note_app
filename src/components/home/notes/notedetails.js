import React from "react";
import { Stack, Fade } from "@mui/material";
import Editor from "../editor/editor";
import NoteMetaData from "./noteMetaData";
import NoteUnselected from "./noteUnselected";
import { useState } from "react";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import NoteNavBar from "./noteNavBar";
import Loading from "./loading";
export default function NoteDetails() {
  const { selected, currentNote, loading } = useNoteDetailed();
  return selected ? (
    loading ? (
      <Fade in timeout={1200}>
        <Stack
          justifyContent={"flex-start"}
          direction={"column"}
          sx={{
            p: 0,
            height: "90vh",
            overflowY: "scroll",
            overflowX: "scroll",
            width: "100%",
          }}
        >
          <NoteNavBar
            heading={currentNote.heading}
            createdAt={currentNote.createdAt}
          />
          <NoteMetaData
            tags={currentNote.tags}
            updatedAt={currentNote.updatedAt}
            createdAt={currentNote.createdAt}
          />

          <Editor
            value={currentNote.note}
            style={{ margin: "0px 20px" }}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </Stack>
      </Fade>
    ) : (
      <Loading />
    )
  ) : (
    <NoteUnselected />
  );
}
