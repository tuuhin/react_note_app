import { Stack, Fade, Typography } from "@mui/material";
import Editor from "../editor/editor";
import NoteMetaData from "./noteMetaData";
import { useNoteDetailed } from "../../../context/useNoteDetails";
import NoteNavBar from "./noteNavBar";
import Loading from "./loading";
import { BlackButton } from "../../common/styled";
import { useEffect } from "react";

export default function NoteDetails() {
  const { selected, currentNote, loading } = useNoteDetailed();

  return selected ? (
    loading ? (
      <Fade in timeout={1200}>
        <Stack
          direction={"column"}
          sx={{ ml: 1, height: "80vh", overflowX: "hidden" }}
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
            style={{ margin: "0px 10px", overflowY: "scroll" }}
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
    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Typography sx={{ fontFamily: "Poppins", mt: 2 }} variant={"h5"}>
        {"Select a note to continue"}
      </Typography>
      <Typography variant="caption" sx={{ color: "gray" }}>
        {"Nothing is currently selected. Please select a note to view."}
      </Typography>
      <BlackButton>{"Add a new Note"}</BlackButton>
    </Stack>
  );
}
