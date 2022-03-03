import React, { useState, useRef } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import Editor from "../editor/editor";
import { useModal } from "../../../context/useNoteModal";
import { useUser } from "../../../context/useUser";
import { addNoteToDb } from "../../../services/firestore";

export default function AddNoteToDb() {
  const { setModal } = useModal();
  const { user } = useUser();
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(false);
  const [headingError, setHeadingError] = useState(false);
  const tags = useRef("");
  const categoryRef = useRef("");
  const [editor, setEditor] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const addNote = async (e) => {
    e.preventDefault();
    if (!heading) return setHeadingError(true);
    console.log(tags.current.value.split(","));
    setLoading(true);
    try {
      await addNoteToDb(
        user,
        heading,
        categoryRef.current.value,
        editor,
        tags.current.value
      );
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      component="form"
      onSubmit={addNote}
      noValidate
      sx={{ p: 2, borderRadius: 10 }}
    >
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="div"
        sx={{
          fontFamily: "Poppins",
          fontWeight: 600,
          width: "100%",
          ml: 3,
          mr: 3,
          mt: 2,
        }}
      >
        Add a note
      </Typography>
      <Box sx={{ overflowY: "scroll", height: "60vh", mt: 1 }}>
        <Stack sx={{ pl: 1, pr: 1, mb: 1 }} direction="column" spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
          >
            <InputLabel htmlFor="heading" required error={headingError}>
              Heading
            </InputLabel>
            <TextField
              error={headingError}
              value={heading}
              onFocus={() => setHeadingError(false)}
              onChange={(e) => setHeading(e.target.value)}
              variant="standard"
              id="heading"
              name="heading"
              helperText={headingError ? "Heading is required" : ""}
              sx={{ width: "80%" }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
          >
            <InputLabel htmlFor="category">Category</InputLabel>
            <TextField
              variant="standard"
              id="category"
              name="category"
              helperText="Add a categrory"
              inputRef={categoryRef}
              sx={{ width: "80%" }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
          >
            <InputLabel htmlFor="tags">Tags</InputLabel>
            <TextField
              inputRef={tags}
              variant="standard"
              id="tags"
              name="tags"
              helperText="Each tag , space seperated"
              sx={{ width: "80%" }}
            />
          </Stack>
        </Stack>
        <Editor value={editor} onChange={(e) => setEditor(e)} />
      </Box>
      <Stack spacing={2} direction={"row"} sx={{ mt: 2, width: "100%" }}>
        <Button
          variant="outlined"
          fullWidth
          color="error"
          onClick={() => setModal(false)}
        >
          Cancel
        </Button>
        <Button variant="contained" fullWidth type="submit">
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </Stack>
    </Stack>
  );
}
