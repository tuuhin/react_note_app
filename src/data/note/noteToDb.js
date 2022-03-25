import React, { useState, useRef } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  InputLabel,
  CircularProgress,
  Chip,
  Grid,
  Popover,
} from "@mui/material";
import { Box } from "@mui/system";
import Editor from "../../components/home/editor/editor";
import { useModal } from "../../context/useNoteModal";
import { useUser } from "../../context/useUser";
import { addNoteToDb } from "../services/firestore";
import { MdAdd } from "react-icons/md";
import { BlackButton } from "../../components/common/styled";
export default function NoteToDb() {
  const { setModal } = useModal();
  const { user } = useUser();
  const [anchor, setAnchor] = useState(null);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(false);
  const [headingError, setHeadingError] = useState(false);
  const [tags, setTags] = useState([]);
  const [newItem, setNewItem] = useState("");
  const categoryRef = useRef("");
  const open = !!anchor;
  const [editor, setEditor] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const addNewTag = () => {
    if (!newItem) return;
    setTags([...tags, newItem]);
    setNewItem("");
  };
  const removeTag = (e) => {
    setTags(tags.filter((value) => value !== e));
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!heading) return setHeadingError(true);
    setLoading(true);
    try {
      await addNoteToDb(user, heading, categoryRef.current.value, editor, tags);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
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
          {"Add a note"}
        </Typography>
        <Box sx={{ overflowY: "scroll", height: "60vh", mt: 1 }}>
          <Grid container spacing={1}>
            <Grid item>
              <InputLabel htmlFor="heading" required error={headingError}>
                {"Heading"}
              </InputLabel>
              <TextField
                error={headingError}
                value={heading}
                onFocus={() => setHeadingError(false)}
                onChange={(e) => setHeading(e.target.value)}
                id="heading"
                name="heading"
                helperText={headingError ? "Heading is required" : ""}
                sx={{ width: "80%" }}
              />
            </Grid>
            <Grid item>
              <InputLabel htmlFor="category">Category</InputLabel>
              <TextField
                id="category"
                name="category"
                helperText="Add a categrory"
                inputRef={categoryRef}
                sx={{ width: "80%" }}
              />
            </Grid>
            <Stack direction="row" flexWrap={"wrap"} spacing={1}>
              {tags &&
                tags.map((e, i) => (
                  <Chip key={i} label={e} onDelete={() => removeTag(e)} />
                ))}
              <Chip
                label={tags.length === 0 ? "Add Tags" : "Add"}
                avatar={<MdAdd />}
                onClick={(e) => setAnchor(e.currentTarget)}
              />
            </Stack>
          </Grid>
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
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Stack direction="column" sx={{ pl: 1, pr: 1 }}>
          <TextField
            variant="outlined"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <BlackButton onClick={addNewTag}>{"Add tags"}</BlackButton>
        </Stack>
      </Popover>
    </>
  );
}
