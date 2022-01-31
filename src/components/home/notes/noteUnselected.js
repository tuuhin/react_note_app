import React from "react";
import { Stack, Typography } from "@mui/material";
import post from "../../../img/post-it.png";

export default function NoteUnselected() {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "70%" }}
    >
      <img src={post} alt="no-notes-present" style={{ width: "25%" }} />
      <Typography sx={{ fontFamily: "Poppins", color: "gray", mt: 2 }}>
        {"Select a note to continue"}
      </Typography>
    </Stack>
  );
}
