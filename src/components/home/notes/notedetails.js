import { Stack, Fade } from "@mui/material";
import Editor from "../editor/editor";
import NoteMetaData from "./noteMetaData";
import NoteUnselected from "./noteUnselected";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import NoteNavBar from "./noteNavBar";
import Loading from "./loading";

export default function NoteDetails() {
  const { selected, currentNote, loading } = useNoteDetailed();

  return selected ? (
    loading ? (
      <Fade in timeout={1200}>
        <Stack
          direction={"column"}
          sx={{
            ml: 1,
            pt: 1,
            height: "calc( 100vh - 80px )",
            overflowY: "scroll",
            flexGrow: 1,
          }}
        >
          <NoteNavBar
            heading={currentNote.heading}
            createdAt={currentNote.createdAt}
          />
          <NoteMetaData
            tags={currentNote.tags}
            updatedAt={currentNote.updatedAt}
            createdAt={currentNote.createdAt}
          />

          <Editor
            value={currentNote.note}
            style={{ margin: "0px 10px" }}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </Stack>
      </Fade>
    ) : (
      <Loading />
    )
  ) : (
    <NoteUnselected />
  );
}
