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

export const signUp = async (email, password, name, userName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await addUserToDb(user, name, userName);
};
export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = (isNew) =>
  signInWithPopup(auth, provider).then(({ user }) =>
    isNew ? addUserToDb(user) : null
  );

export const logOut = () => signOut(auth);
