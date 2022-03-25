import React from "react";
import { styled, Button, Stack } from "@mui/material";
import {
  signInWithGoogle,
  signWithFaceBook,
} from "../../data/services/authservice";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const SocialButton = styled(Button)({
  fontFamily: "Poppins",
  fontWeight: 500,
  color: "darkslategray",
  padding: "10px 20px",
  textTransform: "capitalize",
  transition: "300ms ease-in",
  "&:hover": {
    color: "black",
    transform: "translateY(-15px)",
    backgroundColor: "transparent",
  },
});

export const SignWithGoggleButton = () => (
  <SocialButton onClick={signInWithGoogle} startIcon={<FaGoogle />}>
    {"Google"}
  </SocialButton>
);

export const SignWithFaceBookButton = () => {
  return (
    <SocialButton onClick={signWithFaceBook} startIcon={<FaFacebook />}>
      Facebook
    </SocialButton>
  );
};

const SocialAuth = () => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-around"}
      sx={{ width: "100%", mb: 1 }}
    >
      <SignWithGoggleButton />
      <SignWithFaceBookButton />
    </Stack>
  );
};
export default SocialAuth;
