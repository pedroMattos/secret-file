import { app } from "@/FirebaseSdk/index";
import {
  doc,
  updateDoc,
  getFirestore,
  getDocs,
  collection,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import * as user from "./localUserData";

/**
 *
 * @param {object} data
 * @returns {Promise<void>}
 */
export async function saveFile(data) {
  const userData = await user.getUserData();
  const files = await getFiles();
  const filteredFiles = getFileById(files, data.id);
  filteredFiles.push(data);
  const dbReference = getFirestore(app);
  const projectReferente = doc(
    dbReference,
    process.env.VUE_APP_COLLECTION_NAME,
    userData.at(0).uuid
  );
  return updateDoc(projectReferente, { files: [...filteredFiles] });
}

export async function getFiles() {
  const dbReference = getFirestore(app);
  const querySnapshot = await getDocs(
    collection(dbReference, process.env.VUE_APP_COLLECTION_NAME)
  );

  return querySnapshot.docs
    .map((doc) => {
      return doc.data().files;
    })
    .at(0);
}

function getFileById(fileList, id) {
  if (!fileList?.length) return [];
  return fileList.filter((file) => file.id !== id && file.id);
}

export async function uploadFile(file) {
  const timestamp = new Date().getTime()
  const userData = await user.getUserData();
  const storage = getStorage(app);
  const metadata = {
    contentType: null
  };
  const filePath =  `${userData.at(0).uuid}/${timestamp}`
  const storageRef = ref(storage, filePath);
  await uploadBytesResumable(storageRef, file, metadata);

  return getDownloadURLByPath(filePath)
}

function getDownloadURLByPath(path) {
  const storage = getStorage();
  return getDownloadURL(ref(storage, path))
}
