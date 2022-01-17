import React from "react";
import { Box } from "@mui/system";
import NotesSimplified from "./notesSimplified";
import AddNote from "../addNote/addnote";
import ModalProvider from "../../../context/useModal";

export default function NoteContainer() {
  const arr = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <Box sx={{ borderRight: "1px solid grey", padding: "0px 10px" }}>
      <h2 style={{ fontFamily: "Poppins", border: "0px" }}>My Notes</h2>
      <ModalProvider>
        <AddNote />
      </ModalProvider>
      <Box
        sx={{
          display: "flex",
          margin: "0px 2px",
          flexDirection: "column",
          overflowY: "scroll",
          height: "70vh",
          width: "30vw",
        }}
      >
        {arr.map((e, i) => (
          <NotesSimplified key={i} />
        ))}
      </Box>
    </Box>
  );
}
