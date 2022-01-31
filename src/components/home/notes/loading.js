import React from "react";
import { Typography, CircularProgress, Stack } from "@mui/material";

export default function Loading(props) {
  return (
    <Stack
      direction={"column"}
      alignItems="center"
      justifyContent="center"
      sx={{ width: "70%" }}
    >
      <CircularProgress />
      <Typography variant="overline">Loading</Typography>
    </Stack>
  );
}
