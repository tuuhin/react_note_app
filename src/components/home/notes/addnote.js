import React from "react";
import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
export default function AddNote() {
  return (
    <Button
      variant="outlined"
      fullWidth
      startIcon={<MdAdd />}
      sx={{ mt: 1, mb: 1 }}
    >
      Add note
    </Button>
  );
}
