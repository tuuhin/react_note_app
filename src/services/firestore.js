import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
const db = getFirestore();
export const addUserToDb = async (user) => {
  await setDoc(doc(db, "users", user.uid), {
    created_At: serverTimestamp(),
  });
};

export const addNoteToDb = async (user, heading, category, note, tags) => {
  const formatTags = tags.split(",").map((tag) => tag.trim());
  await addDoc(collection(db, "users", user.uid, "notes"), {
    heading: heading,
    note: note,
    category: category,
    tags: formatTags,
    createdAt: serverTimestamp(),
  });
  console.log("done");
};

export const notesRef = (user) => collection(db, "users", user.uid, "notes");
