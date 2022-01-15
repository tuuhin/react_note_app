import app from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { addUserToDb } from "./firestore";

export const auth = getAuth();

export const signUp = async (email, password, username) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await addUserToDb(user, username);
};
export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logOut = () => signOut(auth);
