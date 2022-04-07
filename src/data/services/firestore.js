import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
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
  if (!!profile) {
    url = await addProfile(user, profile);
  }
  await setDoc(
    doc(db, "users", user.uid),
    url !== undefined
      ? {
          name: name,
          userName: userName,
          about: about,
          photoURL: url,
          updatedAt: serverTimestamp(),
        }
      : {
          name: name,
          userName: userName,
          about: about,
          updatedAt: serverTimestamp(),
        }
  );
};

export const updateNoteByNoteId = async (user, noteId, noteObj) => {
  await updateDoc(doc(db, "users", user.uid, "notes", noteId), noteObj);
};

export const removeNoteByNoteId = async (user, noteId) => {
  await deleteDoc(doc(db, "users", user.uid, "notes", noteId));
};

export const addNoteToDb = async (user, heading, note, tags) => {
  await addDoc(collection(db, "users", user.uid, "notes"), {
    heading: heading,
    note: note,
    tags: tags,
    createdAt: serverTimestamp(),
  });
};

export const notesRef = (user) =>
  query(
    collection(db, "users", user.uid, "notes"),
    orderBy("createdAt", "desc")
  );
export const noteDetailsRef = (user, noteId) =>
  doc(db, "users", user.uid, "notes", noteId);
export const userInfoRef = (user) => doc(db, "users", user.uid);
