import React, { useState, useRef } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Editor from "../editor/editor";
import { useModal } from "../../../context/useModal";
import { useUser } from "../../../context/userContext";
import { addNoteToDb } from "../../../services/firestore";

export default function SaveNotes() {
  const { setModal } = useModal();
  const { user } = useUser();
  const headingRef = useRef("");
  const [editor, setEditor] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const addNote = async () => {
    await addNoteToDb(user, headingRef.current.value, editor);
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{ p: 2, borderRadius: 10 }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h1">
        Add a note
      </Typography>
      <Box sx={{ overflowY: "scroll", height: "60vh" }}>
        <Stack spacing={5} direction={"row"} alignItems={"center"}>
          <Typography variant="h6" component="h2">
            Heading*
          </Typography>
          <TextField variant="standard" fullWidth inputRef={headingRef} />
        </Stack>
        <Stack spacing={5} direction={"row"} alignItems={"flex-end"}>
          <Typography variant="subtitle2" component="h2">
            Tags
          </Typography>
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
        <Button variant="contained" fullWidth onClick={addNote}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
