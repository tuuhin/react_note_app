import React from "react";
import {
  CircularProgress,
  Stack,
  Typography,
  Divider,
  Avatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import NotesSimplified from "./notesSimplified";
import { IoAddOutline } from "react-icons/io5";
import { BlackButton } from "../../common/styled";
import { useNotes } from "../../../context/useNotes";
import { useNoteDetailed } from "../../../context/useNoteDetails";

export default function NoteContainer() {
  const { notes, loading } = useNotes();
  const { selected, setSelected } = useNoteDetailed();

  const onTap = () => {
    if (selected) return setSelected(false);
  };

  if (!loading) {
    return (
      <Stack
        sx={{ height: "75vh" }}
        spaing={0.5}
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
        spacing={1}
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
      <ListItemButton
        onClick={onTap}
        sx={{
          p: 0,
          mt: 1,
          transition: "300ms ease-in-out",
          transform: "scale(0.9)",
          "&:hover": {
            borderRadius: "4px",
            transform: "scale(1)",
          },
        }}
      >
        <Avatar
          sx={{
            backgroundColor: "black",
            color: "white",
            mr: 1.5,
            borderRadius: "10%",
          }}
        >
          <IoAddOutline sx={{ color: "white" }} />
        </Avatar>
        <ListItemText
          primary={
            <Typography
              variant="h6"
              sx={{ fontFamily: "Poppins", fontWeight: 600 }}
            >
              {"My Notes"}
            </Typography>
          }
          secondary={
            <Typography variant="caption">
              {"Click to add a new note 📓📓 "}
            </Typography>
          }
        />
        <Typography variant="body2">{notes.length}</Typography>
      </ListItemButton>
      <Divider sx={{ mb: 1 }} variant="middle" />
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={loading ? "flex-start" : "center"}
        spacing={1.5}
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
