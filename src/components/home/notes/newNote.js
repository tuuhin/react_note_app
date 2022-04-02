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
} from "@mui/material";
import { Box } from "@mui/system";
import Editor from "../editor/editor";
import { useUser } from "../../../context/useUser";
import { addNoteToDb } from "../../../data/services/firestore";
import { MdAdd } from "react-icons/md";
import { BlackButton } from "../../common/styled";
import { currentDate } from "../../../utils/dateFormat";
import { MdSave } from "react-icons/md";
export default function AddNewNote() {
  const { user } = useUser();
  const [anchor, setAnchor] = useState(null);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(false);
  const [headingError, setHeadingError] = useState(false);
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
    if (!heading) return setHeadingError(true);
    setLoading(true);
    try {
      await addNoteToDb(user, heading, editor, tags);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      <Fade in timeout={1200}>
        <Stack
          direction={"column"}
          sx={{ height: "calc(100vh - 64px)", overflowX: "hidden" }}
        >
          <Box>
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
                  {"New Note"}
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
              >
                {"Save"}
              </Button>
            </Toolbar>
            <Divider variant="middle" />
          </Box>
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
                error={headingError}
                value={heading}
                variant="standard"
                onFocus={() => setHeadingError(false)}
                onChange={(e) => setHeading(e.target.value)}
                helperText={headingError ? "Heading is required" : ""}
                sx={{ width: "80%" }}
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
