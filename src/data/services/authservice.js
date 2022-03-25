import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { addUserToDb } from "./firestore";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
export const auth = getAuth();

export const signUp = async (email, password, name, userName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await addUserToDb(user, name, userName);
};
export const signIn = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.warn(error);
    alert(error.code.replace("auth/", ""));
  }
};

export const signWithFaceBook = async () => {
  try {
    await signInWithPopup(auth, facebookProvider);
  } catch (error) {
    console.warn(error);
    alert(error.code.replace("auth/", ""));
  }
};

export const logOut = () => signOut(auth);
