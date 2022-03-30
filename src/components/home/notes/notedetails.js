import { Stack, Fade } from "@mui/material";
import Editor from "../editor/editor";
import NoteMetaData from "./noteMetaData";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import { useCurrentNote } from "../../../context/useCurrentNote";
import NoteNavBar from "./noteNavBar";
import { useEffect } from "react";
import Quotes from "./quote";

export default function NoteDetails() {
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
        <Quotes />
      </Stack>
    );
  }
  return (
    <Fade in timeout={1200}>
      <Stack
        direction={"column"}
        sx={{ ml: 1, height: "80vh", overflowX: "hidden" }}
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
          style={{ margin: "0px 10px", overflowY: "scroll" }}
          onChange={(e) => {
            setNote(e);
          }}
        />
      </Stack>
    </Fade>
  );
}
