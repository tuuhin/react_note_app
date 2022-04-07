import { Navigate } from "react-router-dom";
import NoteContainer from "./noteContainer";
import { Grid } from "@mui/material";
import NoteDetails from "./notedetails";
import NavBar from "../../common/navBar";
import { useUser } from "../../../context/useUser";
import CurrentNote from "../../../context/useCurrentNote";

export default function Home() {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <NavBar />
      <Grid container>
        <Grid item lg={3} sm={4}>
          <NoteContainer />
        </Grid>
        <Grid item lg={9} sm={8}>
          <CurrentNote>
            <NoteDetails />
          </CurrentNote>
        </Grid>
      </Grid>
    </>
  );
}
