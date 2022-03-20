import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { addProfile } from "./firebaseStorage";
const db = getFirestore();
export const addUserToDb = async (user, name, userName) => {
  await setDoc(doc(db, "users", user.uid), {
    created_At: serverTimestamp(),
    name: name,
    userName: userName,
  });
};

export const updateUser = async (user, name, userName, about, profile) => {
  let url;
  if (profile) {
    url = await addProfile(user, profile);
  }
  await updateDoc(doc(db, "users", user.uid), {
    name: name,
    userName: userName,
    about: about,
    photoURL: url,
    updatedAt: serverTimestamp(),
  });
};

export const addNoteToDb = async (user, heading, category, note, tags) => {
  const formatTags = tags.split(",").map((tag) => tag.trim());
  const doc = await addDoc(collection(db, "users", user.uid, "notes"), {
    heading: heading,
    note: note,
    category: category,
    tags: formatTags,
    createdAt: serverTimestamp(),
  });
  await addDoc(collection(db, "users", user.uid, "notes_sh"), {
    heading: heading,
    category: category,
    createdAt: serverTimestamp(),
    reference: doc.id,
  });
};

export const notesRef = (user) =>
  query(
    collection(db, "users", user.uid, "notes_sh"),
    orderBy("createdAt", "desc")
  );
export const noteDetailsRef = (user, noteId) =>
  doc(db, "users", user.uid, "notes", noteId);
export const userInfoRef = (user) => doc(db, "users", user.uid);
