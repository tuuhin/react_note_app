import React from "react";
import { styled, Button, Stack } from "@mui/material";
import { signInWithGoogle, signWithFaceBook } from "../../services/authservice";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const SocialButton = styled(Button)({
  fontFamily: "Poppins",
  fontWeight: 500,
  color: "darkslategray",
  backgroundColor: "transparent",
  padding: "10px 20px",
  textTransform: "capitalize",
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
      sx={{ width: "100%" }}
    >
      <SignWithGoggleButton />
      <SignWithFaceBookButton />
    </Stack>
  );
};
export default SocialAuth;
