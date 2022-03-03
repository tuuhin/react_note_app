import React from "react";
import { styled, Button, Stack } from "@mui/material";
import { signInWithGoogle, signWithFaceBook } from "../../services/authservice";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const RoundedButton = styled(Button)({
  fontFamily: "Poppins",
  fontWeight: 500,
  color: "darkslategray",
  backgroundColor: "transparent",
  padding: "10px 20px",
  textTransform: "capitalize",
});

export const SignWithGoggleButton = () => (
  <RoundedButton onClick={signInWithGoogle} startIcon={<FaGoogle />}>
    {"Google"}
  </RoundedButton>
);

export const SignWithFaceBookButton = () => {
  return (
    <RoundedButton onClick={signWithFaceBook} startIcon={<FaFacebook />}>
      Facebook
    </RoundedButton>
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
