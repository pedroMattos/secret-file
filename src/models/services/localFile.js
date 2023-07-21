import { db } from "@/Dexie";
import * as user from "./localUserData";
import useEncryptData from '@/composables/useEcryptData'
import useDecrypt from '@/composables/useDecrypt'
import { toRaw } from "vue";

export async function getData() {
  const userData = await user.getUserData();
  return db.files.where("uuid").equals(userData.at(0).uuid).reverse().toArray();
}

export async function makeLocalFileUniqueByUser() {
  const files = await getData();
  const userData = await user.getUserData();
  files.forEach((file) => {
    if (file.uuid) return;
    addUuidIntoFile(file.id, userData.at(0).uuid);
  });
}

function checkCloudItemIsLocal(localItems, cloudItem) {
  return !!localItems.find((localItem) => localItem.cloudId === cloudItem.id);
}

export async function createFileByCloudFile(cloudFile) {
  const data = await getData();
  const alreadyLocal = checkCloudItemIsLocal(data, cloudFile);
  if (alreadyLocal) return;
  return db.files.add({
    name: cloudFile.name,
    cloudId: cloudFile.id,
    content: cloudFile.content,
    category: cloudFile.category,
    password: cloudFile.password,
    uuid: cloudFile.uuid,
    fileType: cloudFile.fileType,
    file: cloudFile.file,
    date: cloudFile.date,
    inCloud: cloudFile.inCloud,
  });
}

export async function add(fileData) {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const userData = await user.getUserData();
  const password = useEncryptData(fileData.password)
  return db.files.add({
    name: fileData.name,
    content: fileData.content,
    category: fileData.category,
    password,
    encryptedPassword: password ? true : false,
    uuid: userData.at(0).uuid,
    fileType: fileData.fileType,
    file: fileData.file,
    date: `${year}-${month + 1 > 9 ? month + 1 : "0" + (month + 1)}-${
      day > 9 ? day : "0" + day
    }`,
  });
}

export function update(fileData) {
  return db.files.update(fileData.id, { inCloud: true });
}

export function updateAllPasswords(files) {
  const newFiles = files.map((file) => {
    return {
      ...file,
      password: useEncryptData(file.password)
    }
  })

  newFiles.forEach((newFile) => {
    if (newFile.encryptedPassword) return
    db.files.update(newFile.id, { ...newFile, inCloud: false, encryptedPassword: true });
  })
}

export function updateAllAttributes(id, fileData) {
  const data = fileData
  if (data.protected) {
    data.content = useEncryptData(data.content)
    if (data.file) data.file = useEncryptData(data.file)
  }
  if (!data.encryptedPassword) {
    data.password = useEncryptData(data.password)
  }
  return db.files.update(id, { ...data, inCloud: false, encryptedPassword: data.password ? true : false });
}

export function addUuidIntoFile(id, uuid) {
  return db.files.update(id, { uuid: uuid, inCloud: false });
}

export function deleteById(id) {
  db.files
    .where({ id: id })
    .delete()
    .then(function (deleteCount) {
      console.log("Deleted " + deleteCount + " objects");
    });
}

export async function hasUnSyncItems() {
  const files = await db.files.toArray();
  return files.filter((file) => file.inCloud === false).length;
}

export async function syncAll() {
  const files = await db.files.toArray();
  files
    .filter((file) => file.inCloud === false)
    .forEach((file) => {
      update(file);
    });
}

export function protectContent(fileData) {
  if (fileData.protected) return
  fileData.content = useEncryptData(fileData.content)
  if (fileData.file) fileData.file = useEncryptData(fileData.file)
  return db.files.update(fileData.id, { ...fileData, inCloud: false, protected: true });
}

export function decryptToRead(fileData, attribute) {
  const file = toRaw(fileData)
  if (!file[attribute]) return null
  if (file.protected) return useDecrypt(file[attribute])

  return file[attribute]
}
