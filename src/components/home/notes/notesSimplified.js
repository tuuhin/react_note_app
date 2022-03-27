import { Typography, Stack, Chip } from "@mui/material";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import DateFormat from "../../../utils/dateFormat";
import { NoteHolderPaper } from "../../common/styled";

export default function NotesSimplified(props) {
  const { setNoteId } = useNoteDetailed();
  const showDetails = () => {
    setNoteId(props.id);
  };
  return (
    <NoteHolderPaper onClick={showDetails}>
      <Typography variant={"caption"}>
        <DateFormat at={props.createdAt} />
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          fontSize: "1em",
          fontWeight: 500,
          textTransform: "capitalize",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "now-wrap",
        }}
      >
        {props.heading}
      </Typography>
      <Stack direction={"row"} sx={{ flexWrap: "wrap" }} spacing={0.5}>
        {props.tags.length <= 3 ? (
          <>
            {props.tags.map((e, i) => (
              <Chip sx={{ borderRadius: 1, p: 0.2 }} key={i} label={e} />
            ))}
          </>
        ) : (
          <>
            {props.tags.slice(0, 3).map((e, i) => (
              <Chip sx={{ borderRadius: 1, p: 0.2 }} key={i} label={e} />
            ))}
            <Chip
              sx={{ borderRadius: 1, p: 0.2 }}
              label={`+${props.tags.length - 3} more`}
            />
          </>
        )}
      </Stack>
    </NoteHolderPaper>
  );
}
