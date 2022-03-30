import {
  Toolbar,
  Typography,
  IconButton,
  Button,
  Popover,
  Stack,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import { MdMoreVert, MdDeleteForever, MdUpdate } from "react-icons/md";
import DateFormat from "../../../utils/dateFormat";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import { useCurrentNote } from "../../../context/useCurrentNote";
import { removeNote } from "../../../data/services/firestore";
import { useUser } from "../../../context/useUser";

export default function NoteNavBar(props) {
  const [anchor, setAnchor] = useState(null);
  const { noteId, setSelected } = useNoteDetailed();
  const { tags, currentNote } = useCurrentNote();
  const { user } = useUser();

  const deleteNote = async () => {
    try {
      await removeNote(user, noteId);
      setSelected(false);
    } catch (e) {
      console.log(e);
    }
  };
  const updateNote = () => {
    try {
    } catch (e) {
      console.log(e);
    }
    console.log(noteId, tags);
  };
  const open = !!anchor;
  return (
    <Box sx={{ height: "64px" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "2px solid whitesmoke",
          flexGrow: 1,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "now-wrap",
        }}
      >
        <Stack direction="column" sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {props.heading}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "Poppins", color: "gray" }}
          >
            <DateFormat at={props.createdAt} />
          </Typography>
        </Stack>
        <IconButton
          id="tabar-button"
          onClick={(e) => setAnchor(e.currentTarget)}
        >
          <MdMoreVert />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          anchorOrigin={{ vertical: "center", horizontal: "left" }}
        >
          <Stack direction={"column"} sx={{ p: 1 }}>
            <Button
              onClick={updateNote}
              color={"success"}
              sx={{ fontWeight: 600 }}
              variant={"text"}
              startIcon={<MdUpdate />}
            >
              {"Update"}
            </Button>
            <Divider />
            <Button
              onClick={deleteNote}
              color={"error"}
              variant="text"
              fullWidth
              startIcon={<MdDeleteForever />}
              sx={{ fontWeight: 600 }}
            >
              {"Delete"}
            </Button>
          </Stack>
        </Popover>
      </Toolbar>
    </Box>
  );
}
