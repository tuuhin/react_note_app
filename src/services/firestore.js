import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
const db = getFirestore();
export const addUserToDb = async (user, username) => {
  console.log(user.uid);
  try {
    await addDoc(collection(db, "users", user.uid), {
      name: username,
      created_At: serverTimestamp(),
    });
    console.log("done");
  } catch (e) {
    console.warn(e);
  }
};
