import { db } from "@/Dexie";

export function getData() {
  try {
    const data = db.files.reverse().toArray();
    return data;
  } catch (error) {
    return error;
  }
}

export function add(fileData) {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  try {
    db.files.add({
      name: fileData.name,
      content: fileData.content,
      category: fileData.category,
      password: fileData.password,
      file: fileData.file,
      date: `${year}-${month + 1 > 9 ? month + 1 : "0" + (month + 1)}-${
        day > 9 ? day : "0" + day
      }`,
    });

    return;
  } catch (error) {
    return error;
  }
}

export function update(fileData) {
  return db.files.update(fileData.id, { inCloud: true });
}
export function updateAllAttributes(id, fileData) {
  return db.files.update(id, {...fileData, inCloud: false});
}

export function deleteById(id) {
  db.files
    .where({ id: id })
    .delete()
    .then(function (deleteCount) {
      console.log("Deleted " + deleteCount + " objects");
    });
}
