import { Stack, Fade, Typography } from "@mui/material";
import Editor from "../editor/editor";
import NoteMetaData from "./noteMetaData";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import { useCurrentNote } from "../../../context/useCurrentNote";
import { useNotes } from "../../../context/useNotes";
import NoteNavBar from "./noteNavBar";
import { useEffect } from "react";
import Quotes from "./quote";

export default function NoteDetails() {
  const { notes } = useNotes();
  const { selected, currentNote } = useNoteDetailed();

  const { note, setNote } = useCurrentNote();
  useEffect(() => {
    if (currentNote != null) {
      setNote(currentNote.note);
    }
  }, [currentNote, setNote]);

  if (!selected) {
    return (
      <Stack
        spacing={1.2}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "calc(100vh - 90px)" }}
      >
        {notes.length !== 0 ? (
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, fontFamily: "Poppins" }}
          >
            {"Select a note to continue or add a new one."}
          </Typography>
        ) : (
          <></>
        )}
        <Quotes />
      </Stack>
    );
  }
  return (
    <Fade in timeout={1200}>
      <Stack
        direction={"column"}
        sx={{ height: "calc(100vh - 64px)", overflowX: "hidden" }}
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
          value={note}
          onChange={(e) => {
            setNote(e);
          }}
        />
      </Stack>
    </Fade>
  );
}
