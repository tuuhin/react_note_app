import { Typography, Paper, Slide } from "@mui/material";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import DateFormat from "../../../utils/dateFormat";

export default function NotesSimplified(props) {
  const { setNoteId } = useNoteDetailed();
  return (
    <Slide in timeout={1000} direction={"right"}>
      <Paper
        sx={{ width: "80%", p: 2, pl: 3 }}
        onClick={() => setNoteId(props.noteId)}
      >
        <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
          {props.heading}
        </Typography>
        <Typography variant="body2">{`Category: ${props.category}`}</Typography>
        <Typography variant={"caption"}>
          <DateFormat at={props.createdAt} />
        </Typography>
      </Paper>
    </Slide>
  );
}
