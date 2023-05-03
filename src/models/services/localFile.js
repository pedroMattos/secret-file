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
  try {
    db.files.add({
      name: fileData.name,
      content: fileData.content,
      category: fileData.category,
    });

    return;
  } catch (error) {
    return error;
  }
}
