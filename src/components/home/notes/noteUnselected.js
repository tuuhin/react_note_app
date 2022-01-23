import React from "react";
import { Stack, Typography } from "@mui/material";
import post from "../../../img/post-it.png";

export default function NoteUnselected() {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "100%" }}
    >
      <img src={post} alt="" style={{ width: "25%" }} />
      <Typography variant="overline" sx={{ fontFamily: "Poppins" }}>
        {"Select a note to continue"}
      </Typography>
    </Stack>
  );
}
