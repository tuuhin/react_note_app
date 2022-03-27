import React from "react";
import { Box } from "@mui/system";
import {
  CircularProgress,
  Stack,
  Typography,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import NotesSimplified from "./notesSimplified";
import { useNotes } from "../../../context/useNotes";
import img from "../../img/notes.png";
import { IoAddOutline } from "react-icons/io5";

export default function NoteContainer() {
  const { notes, loading } = useNotes();
  const onTap = () => {};
  return (
    <Box sx={{ mt: 2 }}>
      <ListItemButton onClick={onTap}>
        <ListItemAvatar>
          <IoAddOutline />
        </ListItemAvatar>
        <ListItemText primary={"My notes"} secondary={"Add a new note"} />
        <Typography variant="body2" sx={{ color: "gray" }}>
          {notes.length}
        </Typography>
      </ListItemButton>
      <Divider sx={{ mb: 1 }} variant="middle" />
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={loading ? "flex-start" : "center"}
        spacing={2}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "75vh",
        }}
      >
        {loading ? (
          notes.length !== 0 ? (
            notes.map((note, index) => (
              <NotesSimplified
                key={index}
                heading={note.heading}
                tags={note.tags}
                createdAt={note.createdAt}
                id={note.id}
              />
            ))
          ) : (
            <Stack
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ height: "100%" }}
            >
              <img src={img} alt="" style={{ width: "80%" }} />
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
