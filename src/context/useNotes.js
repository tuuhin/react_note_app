import { useState, useEffect, useContext, createContext } from "react";
import { onSnapshot } from "firebase/firestore";
import { notesRef } from "../data/services/firestore";
import { useUser } from "./useUser";

export const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    const unsuscribe = onSnapshot(notesRef(user), (snapshot) => {
      setNotes(snapshot.docs.map((note) => note.data()));
      setLoading(true);
    });
    return unsuscribe;
  }, [user]);

  const value = {
    notes,
    loading,
  };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
export default NotesProvider;
