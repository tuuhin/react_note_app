import React from "react";
import { Box } from "@mui/system";
import { CircularProgress, Stack, Typography } from "@mui/material";
import NotesSimplified from "./notesSimplified";
import NoteDialog from "../../../data/note/noteDialog";
import NoteModal from "../../../context/useNoteModal";
import { useNotes } from "../../../context/useNotes";
import img from "../../../img/notes.png";

export default function NoteContainer() {
  const { notes, loading } = useNotes();
  return (
    <Box
      sx={{
        padding: "0px 2px",
        borderRight: "2px solid whitesmoke",
        mt: 2,
      }}
    >
      <Typography variant="h5" sx={{ fontFamily: "Poppins", mt: 1, ml: 2 }}>
        {"My Notes"}
      </Typography>
      <NoteModal>
        <NoteDialog />
      </NoteModal>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={loading ? "flex-start" : "center"}
        spacing={2}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "70vh",
          p: 0,
        }}
      >
        {loading ? (
          notes.length !== 0 ? (
            notes.map((note, index) => (
              <NotesSimplified
                key={index}
                heading={note.heading}
                category={note.category}
                createdAt={note.createdAt}
                noteId={note.reference}
              />
            ))
          ) : (
            <Stack
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ height: "100%" }}
            >
              <img src={img} alt="" style={{ width: "50%" }} />
              <Typography variant={"caption"}>
                {"You don't have any notes"}
                {"Try adding some"}
              </Typography>
            </Stack>
          )
        ) : (
          <>
            <CircularProgress />
            <Typography variant="subtitle">{"Loading"}</Typography>
          </>
        )}
      </Stack>
    </Box>
  );
}
