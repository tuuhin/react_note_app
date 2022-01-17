import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/userContext";
import NoteContainer from "./noteContainer";
import { Grid } from "@mui/material";
import NoteDetails from "./notedetails";
import NavBar from "../../navBar";
export default function Home() {
  const { user } = useUser();
  console.log(user);
  return user ? (
    <>
      <NavBar />
      <Grid container>
        <NoteContainer />
        <NoteDetails />
      </Grid>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
