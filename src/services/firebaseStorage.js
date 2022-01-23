import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export const addProfile = async (user, file) => {
  const storageRef = ref(storage, `users/${user.uid}`, file.name);
  const uploadTask = await uploadString(storageRef, file.content, "data_url");
  console.log(uploadTask);
  const url = await getDownloadURL(storageRef);
};
