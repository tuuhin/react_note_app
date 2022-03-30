import React from "react";
import {
  CircularProgress,
  Stack,
  Typography,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import NotesSimplified from "./notesSimplified";
import { useNotes } from "../../../context/useNotes";
import { IoAddOutline } from "react-icons/io5";
import { BlackButton } from "../../common/styled";

export default function NoteContainer() {
  const { notes, loading } = useNotes();
  const onTap = () => {};

  if (!loading) {
    return (
      <Stack
        sx={{ height: "75vh" }}
        spaing={1}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CircularProgress />
        <Typography variant="subtitle2">{"Loading Your notes"}</Typography>
      </Stack>
    );
  }

  if (notes.length === 0) {
    return (
      <Stack
        spacing={2}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "calc( 100vh - 75px )", ml: 2, mr: 2 }}
      >
        <BlackButton>{"Add your first note"}</BlackButton>
        <Typography variant={"caption"}>
          {
            "It's seems like you are a newbie ... here.Click to add your first note "
          }
        </Typography>
      </Stack>
    );
  }
  return (
    <>
      <ListItemButton onClick={onTap}>
        <ListItemAvatar>
          <IoAddOutline />
        </ListItemAvatar>
        <ListItemText primary={"My notes"} secondary={"Add a new note"} />
        <Typography variant="body2" sx={{ color: "gray" }}>
          {notes.length}
        </Typography>
      </ListItemButton>
      <Divider sx={{ mb: 0.5 }} variant="middle" />
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
        {notes.map((note, index) => (
          <NotesSimplified
            key={index}
            heading={note.heading}
            tags={note.tags}
            createdAt={note.createdAt}
            id={note.id}
          />
        ))}
      </Stack>
    </>
  );
}
