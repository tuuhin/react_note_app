import { useState, useContext, createContext, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useUser } from "./useUser";
import { noteDetailsRef } from "../services/firestore";
export const NoteDetailsContext = createContext();
export const useNoteDetailed = () => useContext(NoteDetailsContext);

const NoteDetailsProvider = (props) => {
  const [noteId, setNoteId] = useState(null);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [currentNote, setCurrentNote] = useState({
    note: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
  });
  useEffect(() => {
    if (!!noteId) {
      setSelected(true);
      const cleanUp = onSnapshot(noteDetailsRef(user, noteId), (snapshot) => {
        setCurrentNote(snapshot.data());
        setLoading(true);
      });
      return () => {
        cleanUp();
        console.log("cleaned");
        setLoading(false);
      };
    }
  }, [user, noteId]);

  const value = { selected, setSelected, currentNote, setNoteId, loading };
  return (
    <NoteDetailsContext.Provider value={value}>
      {props.children}
    </NoteDetailsContext.Provider>
  );
};
export default NoteDetailsProvider;
