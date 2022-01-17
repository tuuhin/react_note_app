import app from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { addUserToDb } from "./firestore";

const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const signUp = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await addUserToDb(user);
};
export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const logOut = () => signOut(auth);
