import { db } from "@/Dexie";

export default function add(fileData) {
  try {
    db.files.add({
      name: fileData.value,
      content: fileData.value,
      category: fileData.value,
    });

    return;
  } catch (error) {
    return error;
  }
}
