import React from "react";
import { styled, Button } from "@mui/material";
import googleImage from "../../img/google.png";
import { signInWithGoogle } from "../../services/authservice";
const GoogleButton = styled(Button)({
  color: "darkslategray",
  backgroundColor: "transparent",
  padding: "10px 25px",
  borderRadius: "10px",
  border: "1px solid grey",
  textTransform: "capitalize",
});

const SignInWithGoggleButton = (props) => (
  <GoogleButton
    size="small"
    onClick={() => signInWithGoogle(props.isNew)}
    sx={{ fontFamily: "Poppins", fontWeight: 500 }}
    startIcon={
      <img
        src={googleImage}
        alt="Google Logo"
        style={{ height: "24px", width: "24px" }}
      />
    }
  >
    {props.title}
  </GoogleButton>
);

export default SignInWithGoggleButton;
