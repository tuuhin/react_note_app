import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/authservice";
import { userInfoRef } from "../services/firestore";
import { onSnapshot } from "firebase/firestore";
export const AuthContext = createContext();
export const useUser = () => useContext(AuthContext);

const Auth = (props) => {
  const [user, setuser] = useState();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setuser(user));
  }, []);
  useEffect(() => {
    if (user != null) {
      const cleanUp = onSnapshot(userInfoRef(user), (snapshot) => {
        setUserInfo(snapshot.data());
      });
      return cleanUp;
    }
  }, [user]);

  const value = { user, userInfo };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
export default Auth;
