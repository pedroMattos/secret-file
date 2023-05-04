import { db } from "@/Dexie";

export function getData() {
  try {
    const data = db.files.toArray();
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
      date: `${year}-${month > 9 ? month : "0" + month}-${
        day > 9 ? day : "0" + day
      }`,
    });

    return;
  } catch (error) {
    return error;
  }
}

export function deleteById(id) {
  db.files
    .where({ id: id })
    .delete()
    .then(function (deleteCount) {
      console.log("Deleted " + deleteCount + " objects");
    });
}
