import { useEffect } from "react";
import { Stack, Fade } from "@mui/material";
import Editor from "../editor/editor";
import NoteMetaData from "./noteMetaData";
import NoteNavBar from "./noteNavBar";
import AddNewNote from "./newNote";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import { useCurrentNote } from "../../../context/useCurrentNote";

export default function NoteDetails() {
  const { selected, currentNote } = useNoteDetailed();

  const { note, setNote } = useCurrentNote();

  useEffect(() => {
    setNote(currentNote.note);
  }, [currentNote, setNote]);

  if (!selected) {
    return <AddNewNote />;
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
