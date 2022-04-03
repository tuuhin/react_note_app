import { Toolbar, Typography, Button, Stack, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { MdDeleteForever, MdUpdate } from "react-icons/md";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import { useCurrentNote } from "../../../context/useCurrentNote";
import { removeNote } from "../../../data/services/firestore";
import { useUser } from "../../../context/useUser";
import { currentDateFromTimeStamp } from "../../../utils/dateFormat";

export default function NoteNavBar(props) {
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

  return (
    <Box sx={{ height: "64px" }}>
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
            {props.heading}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "Poppins", color: "gray" }}
          >
            {currentDateFromTimeStamp(props.createdAt)}
          </Typography>
        </Stack>
        <Button
          onClick={updateNote}
          sx={{ fontWeight: 400, color: "black" }}
          variant={"text"}
          startIcon={<MdUpdate />}
        >
          {"Update"}
        </Button>
        <Divider />
        <Button
          onClick={deleteNote}
          variant="text"
          startIcon={<MdDeleteForever />}
          sx={{ fontWeight: 400, color: "black" }}
        >
          {"Delete"}
        </Button>
      </Toolbar>
      <Divider variant="middle" />
    </Box>
  );
}
