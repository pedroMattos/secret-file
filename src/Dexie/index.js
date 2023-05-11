import Dexie from "dexie";

export const db = new Dexie("myFiles");
export const dbUser = new Dexie("userData");
db.version(1).stores({
  files: "++id, name, content, password, file, uuid",
});
dbUser.version(1).stores({
  user: "uuid, name, lastLogin",
});
