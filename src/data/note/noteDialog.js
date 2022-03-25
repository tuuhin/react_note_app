import React from "react";
import { Dialog } from "@mui/material";
import { MdAdd } from "react-icons/md";
import NoteToDb from "./noteToDb";
import { useModal } from "../../context/useNoteModal";
import { AddNoteButton } from "../../components/common/styled";
export default function NoteDialog() {
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
        <NoteToDb />
      </Dialog>
    </>
  );
}
