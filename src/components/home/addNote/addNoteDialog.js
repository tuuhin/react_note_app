import React from "react";
import { Button, Dialog } from "@mui/material";
import { MdAdd } from "react-icons/md";
import AddNoteToDb from "./addNoteToDb";
import { useModal } from "../../../context/useNoteModal";
import { AddNoteButton } from "../../../utils/styled";
export default function AddNoteDialog() {
  const { modal, setModal } = useModal();

  return (
    <>
      <AddNoteButton onClick={() => setModal(!modal)} startIcon={<MdAdd />}>
        Add new note
      </AddNoteButton>
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
