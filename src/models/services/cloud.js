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
import useFileExtension from "@/composables/useFileExtension"

/**
 *
 * @param {object} data
 * @returns {Promise<void>}
 */
export async function saveFile(data) {
  const userData = await user.getUserData();
  const files = await getFiles(userData.at(0).uuid);
  const filteredFiles = getFileById(files.files, data.id);
  filteredFiles.push(data);
  return save(filteredFiles, userData.at(0).uuid)
}

function save(filesData, uuid) {
  const dbReference = getFirestore(app);
  const projectReferente = doc(
    dbReference,
    process.env.VUE_APP_COLLECTION_NAME,
    uuid
  );
  return updateDoc(projectReferente, { files: [...filesData] });
}

export async function deleteFile(itemId) {
  const userData = await user.getUserData();
  const {files} = await getFiles(userData.at(0).uuid);
  const filesWithouSelected = getFileById(files, itemId)
  return save(filesWithouSelected, userData.at(0).uuid)
}

export async function getFiles(documentRef) {
  const dbReference = getFirestore(app);
  const querySnapshot = await getDocs(
    collection(dbReference, process.env.VUE_APP_COLLECTION_NAME)
  );

  return querySnapshot.docs
    .find((doc) => {
      return documentRef === doc.id;
    }).data()
}

function getFileById(fileList, id) {
  if (!fileList?.length) return [];
  return fileList.filter((file) => file.id !== id);
}

export async function uploadFile(file) {
  const extension = useFileExtension(file.name)
  const timestamp = new Date().getTime()
  const userData = await user.getUserData();
  const storage = getStorage(app);
  const metadata = {
    contentType: null
  };
  const filePath =  `${userData.at(0).uuid}/${timestamp}.${extension}`
  const storageRef = ref(storage, filePath);
  await uploadBytesResumable(storageRef, file, metadata);

  return getDownloadURLByPath(filePath)
}

function getDownloadURLByPath(path) {
  const storage = getStorage();
  return getDownloadURL(ref(storage, path))
}
