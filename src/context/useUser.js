import { createContext, useContext, useState, useEffect } from "react";

import { auth } from "../data/services/authservice";
import { userInfoRef } from "../data/services/firestore";
import { onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// AuthContext
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
        console.log(snapshot.data());
        setUserInfo(snapshot.data());
      });
      return cleanUp;
    }
  }, [user]);

  const value = { user, userInfo };
  console.log(user);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
export default Auth;
