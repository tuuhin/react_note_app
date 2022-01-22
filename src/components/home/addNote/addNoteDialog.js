import React from "react";
import { Button, Dialog } from "@mui/material";
import { MdAdd } from "react-icons/md";
import AddNoteToDb from "./addNoteToDb";
import { useModal } from "../../../context/useNoteModal";
export default function AddNoteDialog() {
  const { modal, setModal } = useModal();

  return (
    <>
      <Button
        onClick={() => setModal(!modal)}
        variant="outlined"
        fullWidth
        startIcon={<MdAdd />}
        sx={{ mt: 1, mb: 1 }}
      >
        Add note
      </Button>
      <Dialog
        open={modal}
        onClose={() => setModal(!modal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddNoteToDb />
      </Dialog>
    </>
  );
}
