import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/useUser";
import NoteContainer from "./noteContainer";
import { Grid } from "@mui/material";
import NoteDetails from "./notedetails";
import NavBar from "../../common/navBar";
import NotesProvider from "../../../context/useNotes";
import NoteDetailsProvider from "../../../context/useNoteDetails";
import CurrentNote from "../../../context/useCurrentNote";

export default function Home() {
  const { user } = useUser();

  return user ? (
    <NotesProvider>
      <NavBar />
      <NoteDetailsProvider>
        <Grid container>
          <Grid item lg={3} sm={5}>
            <NoteContainer style={{ marginTop: "5px" }} />
          </Grid>
          <Grid item lg={9} sm={7}>
            <CurrentNote>
              <NoteDetails />
            </CurrentNote>
          </Grid>
        </Grid>
      </NoteDetailsProvider>
    </NotesProvider>
  ) : (
    <Navigate to="/login" />
  );
}
