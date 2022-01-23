import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
const db = getFirestore();
export const addUserToDb = async (user) => {
  await setDoc(doc(db, "users", user.uid), {
    created_At: serverTimestamp(),
  });
};

export const updateUser = async (user) => {
  await updateDoc(doc(db, "users", user.uid), {});
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

export const notesRef = (user) => collection(db, "users", user.uid, "notes_sh");
export const noteDetailsRef = (user, noteId) =>
  doc(db, "users", user.uid, "notes", noteId);
