import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/useUser";
import NoteContainer from "./noteContainer";
import { Stack } from "@mui/material";
import NoteDetails from "./noteDetails";
import NavBar from "../../utils/navBar";
import NotesProvider from "../../../context/useNotes";
import NoteDetailsProvider from "../../../context/useNoteDetails";
export default function Home() {
  const { user } = useUser();
  return user ? (
    <NotesProvider>
      <NavBar />
      <NoteDetailsProvider>
        <Stack direction="row">
          <NoteContainer />
          <NoteDetails />
        </Stack>
      </NoteDetailsProvider>
    </NotesProvider>
  ) : (
    <Navigate to="/login" />
  );
}
