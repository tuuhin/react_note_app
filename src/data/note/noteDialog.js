import React from "react";
import { Dialog } from "@mui/material";
import { MdAdd } from "react-icons/md";
import NoteToDb from "./noteToDb";
import { useModal } from "../../context/useNoteModal";
import { BlackButton } from "../../components/common/styled";
export default function NoteDialog() {
  const { modal, setModal } = useModal();

  return (
    <>
      {/* <BlackButton onClick={() => setModal(!modal)} startIcon={<MdAdd />}>
        Add new note
      </BlackButton> */}
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
