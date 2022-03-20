import React from "react";
import { Stack, Typography } from "@mui/material";
import { BlackButton } from "../../../utils/styled";

export default function NoteUnselected() {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "70%" }}
    >
      <Typography sx={{ fontFamily: "Poppins", mt: 2 }} variant={"h5"}>
        {"Select a note to continue"}
      </Typography>
      <Typography variant="caption" sx={{ color: "gray" }}>
        {"Nothing is currently selected. Please select a note to view."}
      </Typography>
      <BlackButton>{"Add a new Note"}</BlackButton>
    </Stack>
  );
}
