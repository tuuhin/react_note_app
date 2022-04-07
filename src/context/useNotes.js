import { useState, useEffect, useContext, createContext } from "react";
import { onSnapshot } from "firebase/firestore";
import { notesRef } from "../data/services/firestore";
import { useUser } from "./useUser";
import NoteDetailsProvider from "./useNoteDetails";
import ViewProvider from "./useView";
import AlertProvider from "./useSnackbar";

export const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

const NotesProvider = (props) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const unsubscribe = onSnapshot(notesRef(user), (snapshot) => {
      setNotes(
        snapshot.docs.map(function (note) {
          return { ...note.data(), id: note.id };
        })
      );
      setLoading(true);
    });
    return unsubscribe;
  }, [user]);

  const value = { notes, loading };

  return (
    <AlertProvider>
      <ViewProvider>
        <NotesContext.Provider value={value}>
          <NoteDetailsProvider>{props.children}</NoteDetailsProvider>
        </NotesContext.Provider>
      </ViewProvider>
    </AlertProvider>
  );
};
export default NotesProvider;
