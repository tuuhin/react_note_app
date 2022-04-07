import React, { createContext, useContext, useState } from "react";

export const CurrentNoteContext = createContext();

export const useCurrentNote = () => useContext(CurrentNoteContext);

const CurrentNote = (props) => {
  const [tags, setTags] = useState([]);
  const [note, setNote] = useState(null);
  const value = { tags, setTags, setNote, note };
  return (
    <CurrentNoteContext.Provider value={value}>
      {props.children}
    </CurrentNoteContext.Provider>
  );
};
export default CurrentNote;
