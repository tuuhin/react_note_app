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
    name: "",
    created_At: serverTimestamp(),
  });
};

export const addNoteToDb = async (user, heading, note) => {
  try {
    await addDoc(collection(db, "users", user.uid, "notes"), {
      heading: heading,
      note: note,
    });
    console.log("done");
  } catch (e) {
    console.log(e);
  }
};
