import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/authservice";
export const AuthContext = createContext();
export const useUser = () => useContext(AuthContext);

const Auth = (props) => {
  const [user, setuser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setuser(user));
  }, []);

  const value = { user };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
export default Auth;
