import { useState, useContext, createContext } from "react";
export const NoteDetailsContext = createContext();
export const useNoteDetailed = () => useContext(NoteDetailsContext);
const NoteDetailsProvider = (props) => {
  const [note, setNote] = useState({
    note: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
  });
  const [selected, setSelected] = useState(false);
  const value = { selected, setSelected, note, setNote };
  return (
    <NoteDetailsContext.Provider value={value}>
      {props.children}
    </NoteDetailsContext.Provider>
  );
};
export default NoteDetailsProvider;
