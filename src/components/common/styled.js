import { styled } from "@mui/styles";
import { Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)({
  textDecoration: "none",
  fontSize: "0.8em",
  fontWeight: 600,
  color: "black",
  fontFamily: "Poppins",
  transition: "200ms ease-in",
  "&:hover": {
    transform: "translateX(10px) scale(1.2)",
    textDecoration: "underline",
  },
});

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
  fontSize: "1.1em",
  padding: "8px 25px ",
  textDecoration: "none",
  fontFamily: "Poppins",
  borderRadius: "5px",
  textTransform: "none",
  margin: "8px 0px",
  border: "1px solid transparent",
  boxShadow: "0px 2px 5px 2px rgba(80, 80, 80, 0.3)",
  transition: "200ms ease-in-out",
  "&:hover": {
    color: "black",
    backgroundColor: "transparent",
    border: "1px solid rgba(100, 100, 100, 0.7)",
    boxShadow: "0px 5px 12px 2px rgba(80, 80, 80, 0.5)",
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
