import { Typography, Slide } from "@mui/material";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import DateFormat from "../../../utils/dateFormat";
import { NoteHolderPaper } from "../../../utils/styled";

export default function NotesSimplified(props) {
  const { setNoteId } = useNoteDetailed();
  return (
    <Slide in timeout={1000} direction={"right"}>
      <NoteHolderPaper onClick={() => setNoteId(props.noteId)}>
        <Typography variant={"caption"}>
          <DateFormat at={props.createdAt} />
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textTransform: "capitalize",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "now-wrap",
          }}
        >
          {props.heading}
        </Typography>
        <Typography variant="body2">{`Category: ${props.category}`}</Typography>
      </NoteHolderPaper>
    </Slide>
  );
}
