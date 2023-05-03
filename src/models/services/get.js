import { db } from "@/Dexie";

export default function getData() {
  try {
    const data = db.files.toArray();
    return data;
  } catch (error) {
    return error;
  }
}
