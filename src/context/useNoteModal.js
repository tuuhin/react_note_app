import React, { createContext, useContext, useState } from "react";

export const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

const NoteModal = (props) => {
  const [modal, setModal] = useState(false);

  const value = { modal, setModal };
  return (
    <ModalContext.Provider value={value}>
      {props.children}
    </ModalContext.Provider>
  );
};
export default NoteModal;
