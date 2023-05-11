import { db } from "@/Dexie";
import * as user from "./localUserData";

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

export async function add(fileData) {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const userData = await user.getUserData();
  return db.files.add({
    name: fileData.name,
    content: fileData.content,
    category: fileData.category,
    password: fileData.password,
    uuid: userData.at(0).uuid,
    file: fileData.file,
    date: `${year}-${month + 1 > 9 ? month + 1 : "0" + (month + 1)}-${
      day > 9 ? day : "0" + day
    }`,
  });
}

export function update(fileData) {
  return db.files.update(fileData.id, { inCloud: true });
}
export function updateAllAttributes(id, fileData) {
  return db.files.update(id, { ...fileData, inCloud: false });
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
