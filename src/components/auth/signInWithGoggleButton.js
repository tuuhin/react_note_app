import React from "react";
import { styled, Button } from "@mui/material";
import googleImage from "../../img/google.png";
import { signInWithGoogle } from "../../services/authservice";
const GoogleButton = styled(Button)({
  color: "darkslategray",
  backgroundColor: "transparent",
  padding: 8,
  borderRadius: "5px",
  border: "1px solid grey",
  textTransform: "capitalize",
});

const SignInWithGoggleButton = () => (
  <GoogleButton
    size="small"
    fullWidth
    onClick={signInWithGoogle}
    sx={{ fontFamily: "Poppins" }}
    startIcon={
      <img src={googleImage} alt="" style={{ height: "24px", width: "24px" }} />
    }
  >
    Sign with Google
  </GoogleButton>
);

export default SignInWithGoggleButton;
