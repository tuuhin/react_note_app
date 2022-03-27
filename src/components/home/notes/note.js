import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/useUser";
import NoteContainer from "./noteContainer";
import { Grid, Divider } from "@mui/material";
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
          <Grid item lg={3} sm={5} xl={2}>
            <NoteContainer />
          </Grid>
          <Grid item>
            <Divider orientation="vertical" variant="middle" sx={{ ml: 0.5 }} />
          </Grid>
          <Grid item lg={8} sm={6} xl={9}>
            <NoteDetails />
          </Grid>
        </Grid>
      </NoteDetailsProvider>
    </NotesProvider>
  ) : (
    <Navigate to="/login" />
  );
}
