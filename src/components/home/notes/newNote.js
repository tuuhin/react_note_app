import { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Fade,
  Toolbar,
  Chip,
  Grid,
  Popover,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import Editor from "../editor/editor";
import { useUser } from "../../../context/useUser";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import { useSnackbar } from "../../../context/useSnackbar";
import { addNoteToDb } from "../../../data/services/firestore";
import { currentDate } from "../../../utils/dateFormat";
import { MdSave, MdAdd } from "react-icons/md";

export default function AddNewNote() {
  const { user } = useUser();
  const { setSelected } = useNoteDetailed();
  const { setAlertBody, setAlertHead, setIsSnackBarOpen } = useSnackbar();

  const [anchor, setAnchor] = useState(null);
  const [heading, setHeading] = useState("");

  const [tags, setTags] = useState([]);
  const [newItem, setNewItem] = useState("");

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
    if (!heading) {
      setIsSnackBarOpen(true);
      setAlertHead("warning");
      setAlertBody("Heading is required");
      return;
    }
    if (
      editor ===
      [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ]
    ) {
      setIsSnackBarOpen(true);
      setAlertHead("warning");
      setAlertBody("There is nothing in the editor");
      return;
    }
    try {
      setIsSnackBarOpen(true);
      setAlertHead("warning");
      setAlertBody("Submitting your note");
      const id = await addNoteToDb(user, heading, editor, tags);
      setSelected(id);
      setAlertHead("success");
      setAlertBody("Your note is successfully added");
    } catch (e) {
      console.log(e);
      setAlertHead("error");
      setAlertBody("Failed🤔");
    }
  };

  return (
    <>
      <Fade in timeout={1200}>
        <Stack
          direction={"column"}
          component="form"
          noValidate
          onSubmit={addNote}
          sx={{ height: "calc(100vh - 64px)", overflowX: "hidden" }}
        >
          <Toolbar>
            <Stack direction="column" sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  textTransform: "capitalize",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "now-wrap",
                }}
              >
                {!!heading ? heading : "📔📔 New Note "}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "Poppins", color: "gray" }}
              >
                {currentDate()}
              </Typography>
            </Stack>
            <Button
              startIcon={<MdSave />}
              variant="text"
              sx={{ fontWeight: 400, color: "black" }}
              type="submit"
            >
              {"Save"}
            </Button>
          </Toolbar>
          <Divider variant="middle" />

          <Grid container rowSpacing={3} columnSpacing={2} sx={{ p: 1.5 }}>
            <Grid item sm={3} lg={3}>
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "Poppins", textTransform: "capitalize" }}
              >
                {"Heading"}
              </Typography>
            </Grid>
            <Grid item sm={9} lg={9}>
              <TextField
                value={heading}
                autoFocus
                variant="standard"
                sx={{ pr: 3 }}
                onChange={(e) => setHeading(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item sm={3} lg={3}>
              <Typography
                variant="body2"
                sx={{ fontFamily: "Poppins", textTransform: "capitalize" }}
              >
                {"Tags"}
              </Typography>
            </Grid>
            <Grid item sm={6} lg={6}>
              <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.5 }}>
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
          </Grid>
          <Editor value={editor} onChange={(e) => setEditor(e)} />
        </Stack>
      </Fade>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
      >
        <Stack
          direction="row"
          alignItems={"flex-end"}
          sx={{ p: 0.8 }}
          spacing={0.5}
        >
          <TextField
            variant="standard"
            autoFocus
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <IconButton onClick={addNewTag}>
            <Avatar sx={{ backgroundColor: "black" }}>
              <MdAdd />
            </Avatar>
          </IconButton>
        </Stack>
      </Popover>
    </>
  );
}
