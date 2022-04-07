import { createContext, useContext, useState } from "react";

export const ViewContext = createContext();

export const useView = () => useContext(ViewContext);

const ViewProvider = (props) => {
  const [isNew, setIsNew] = useState(false);
  const data = { isNew, setIsNew };

  return (
    <ViewContext.Provider value={data}>{props.children}</ViewContext.Provider>
  );
};

export default ViewProvider;
