import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/useUser";
import NoteContainer from "./noteContainer";
import { Stack, Grid } from "@mui/material";
import NoteDetails from "./noteDetails";
import NavBar from "../../common/navBar";
import NotesProvider from "../../../context/useNotes";
import NoteDetailsProvider from "../../../context/useNoteDetails";

export default function Home() {
  const { user } = useUser();

  return user ? (
    <NotesProvider>
      <NavBar />
      <NoteDetailsProvider>
        <Grid container>
          <Grid item lg={3} sm={5} xl={2} xs={12}>
            <NoteContainer />
          </Grid>
          <Grid item lg={9} sm={7} xl={10} xs={12}>
            <NoteDetails />
          </Grid>
        </Grid>
      </NoteDetailsProvider>
    </NotesProvider>
  ) : (
    <Navigate to="/login" />
  );
}
