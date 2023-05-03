import Dexie from "dexie";

export const db = new Dexie("myFiles");
db.version(1).stores({
  files: "++id, name, content, password", // Primary key and indexed props
});
