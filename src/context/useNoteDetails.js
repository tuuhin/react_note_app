import { useState, useContext, createContext, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useUser } from "./useUser";
import { noteDetailsRef } from "../data/services/firestore";

export const NoteDetailsContext = createContext();
export const useNoteDetailed = () => useContext(NoteDetailsContext);

const NoteDetailsProvider = (props) => {
  const { user } = useUser();
  const [currentNote, setCurrentNote] = useState({
    note: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
  });
  const [noteId, setNoteId] = useState(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!!noteId) {
      setSelected(true);
      const cleanUp = onSnapshot(noteDetailsRef(user, noteId), (snapshot) => {
        setCurrentNote({ ...snapshot.data(), id: snapshot.id });
      });
      return () => {
        cleanUp();
        console.log("cleaned");
      };
    }
  }, [user, noteId]);

  const value = {
    selected,
    setSelected,
    currentNote,
    setNoteId,
    noteId,
  };
  return (
    <NoteDetailsContext.Provider value={value}>
      {props.children}
    </NoteDetailsContext.Provider>
  );
};
export default NoteDetailsProvider;
