import { useState, useEffect, useContext, createContext } from "react";
import { onSnapshot } from "firebase/firestore";
import { notesRef } from "../services/firestore";
import { useUser } from "./userContext";

export const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    const noteSnaphshot = onSnapshot(notesRef(user), (snapshot) => {
      setNotes(snapshot.docs.map((note) => note.data()));
      setLoading(true);
    });
    return noteSnaphshot;
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
