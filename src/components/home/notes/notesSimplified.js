import { Typography, Stack, Chip } from "@mui/material";
import { useNoteDetailed } from "../../../context/useNoteDetails";

import { currentDateFromTimeStamp } from "../../../utils/dateFormat";
import { NoteHolderPaper } from "../../common/styled";

export default function NotesSimplified(props) {
  const { setNoteId } = useNoteDetailed();

  const showDetails = () => {
    setNoteId(props.id);
  };
  return (
    <NoteHolderPaper onClick={showDetails}>
      <Typography variant={"caption"}>
        {currentDateFromTimeStamp(props.createdAt)}
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
      <Stack direction={"row"} sx={{ flexWrap: "wrap", gap: 0.5 }}>
        {props.tags.map((e, i) => (
          <Chip
            sx={{
              borderRadius: 2,
              p: 0.2,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "now-wrap",
            }}
            key={i}
            label={e}
          />
        ))}
      </Stack>
    </NoteHolderPaper>
  );
}
