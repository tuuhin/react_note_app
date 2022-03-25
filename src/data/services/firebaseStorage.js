import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export const addProfile = async (user, file) => {
  const storageRef = ref(storage, `users/${user.uid}/${file.name}`);
  await uploadString(storageRef, file.content, "data_url");
  const url = await getDownloadURL(storageRef);
  return url;
};
