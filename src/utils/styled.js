import { styled } from "@mui/styles";
import { Button, Paper } from "@mui/material";

export const Tag = styled("div")({
  backgroundColor: "whitesmoke",
  color: "gray",
  borderRadius: "8px",
  padding: "2px 10px ",
  fontSize: "0.75em",
  fontFamily: "Poppins",
});

export const MutedText = styled("p")({
  color: "gray",
  fontFamily: "Poppins",
  fontWeight: 500,
  padding: 0,
  fontSize: "0.9em",
});

export const BlackButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  padding: "8px 25px ",
  fontSize: "1.2em",
  textDecoration:'none',
  fontFamily: "Poppins",
  borderRadius: "10px",
  textTransform: "none",
  margin: "10px 0px",
  border: "1px solid black",
  boxShadow: "0px 4px 20px 3px gray",
  "&:hover": {
    color: "black",
    backgroundColor: "transparent",
  },
});

export const LogoLink = styled(Button)({
  textDecoration: "none",
  fontSize: "1.2em",
  color: "black",
  fontWeight: 500,
});

export const NavButtons = styled(Button)({
  color: "gray",
  textDecoration: "none",
  textTransform: "capitalize",
  fontFamily: "Poppins",
  fontSize: "1em",
  fontWeight: 400,
  padding: "0px 10px",
  letterSpacing: "1px",
  "&:hover": {
    color: "black",
  },
});

export const AddNoteButton = styled(Button)({
  color: "black",
  backgroundColor: "whitesmoke",
  borderRadius: "5px",
  width: "85%",
  fontSize: "1em",
  padding: "8px 20px",
  border: "none",
  textTransform: "none",
  margin: "1em",
  boxShadow: "none",
  "&:hover": {
    color: "black",
    backgroundColor: "rgb(230,230,230)",
  },
});

export const NoteHolderPaper = styled(Paper)({
  backgroundColor: "whitesmoke",
  color: "gray",
  boxShadow: "none",
  margin: "0px",
  width: "85%",
  padding: "10px",
  borderRadius: 8,
  "&:hover": {
    color: "black",
    cursor: "pointer",
    backgroundColor: "#e8e8e8",
  },
});
