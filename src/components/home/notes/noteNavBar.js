import { Toolbar, Typography, Stack, Divider } from "@mui/material";
import { MdDeleteForever, MdUpdate } from "react-icons/md";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import { useCurrentNote } from "../../../context/useCurrentNote";
import { useUser } from "../../../context/useUser";
import { useSnackbar } from "../../../context/useSnackbar";
import { currentDateFromTimeStamp } from "../../../utils/dateFormat";
import { NoteButtons } from "../../common/styled";
import { removeNoteByNoteId } from "../../../data/services/firestore";

export default function NoteNavBar(props) {
  const { noteId, setSelected } = useNoteDetailed();
  const { tags } = useCurrentNote();
  const { user } = useUser();
  const { setAlertBody, setAlertHead, setIsSnackBarOpen } = useSnackbar();

  const deleteNote = async () => {
    try {
      setIsSnackBarOpen(true);
      setAlertBody("Removing your note");
      await removeNoteByNoteId(user, noteId);
      setAlertHead("success");
      setAlertBody("Successfully removed your note 😉😉");
      setSelected(false);
    } catch (e) {
      setAlertHead("error");
      setAlertBody("failed to submit your note 😢");
      console.log(e);
    }
  };
  const updateNote = async () => {
    try {
      setIsSnackBarOpen(true);
      setAlertBody("Updating your notes");
      console.log(tags);
      // await updateNoteByNoteId(user, { tags: tags });
      setAlertHead("success");
      setAlertBody(`${props.heading} has been updated successfully`);
    } catch (e) {
      setAlertHead("error");
      setAlertBody("failed to submit your note 😠");
      console.log(e);
    }
  };

  return (
    <>
      <Toolbar>
        <Stack direction="column" sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins",
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
            {props.createdAt && currentDateFromTimeStamp(props.createdAt)}
          </Typography>
        </Stack>

        <NoteButtons onClick={updateNote} startIcon={<MdUpdate />}>
          {"Update"}
        </NoteButtons>
        <Divider />
        <NoteButtons onClick={deleteNote} startIcon={<MdDeleteForever />}>
          {"Delete"}
        </NoteButtons>
      </Toolbar>
      <Divider variant="middle" />
    </>
  );
}
