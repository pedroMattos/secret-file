import Dexie from "dexie";

export const db = new Dexie("myFiles");
export const dbUser = new Dexie("userData");
db.version(2).stores({
  files: "++id, name, content, uuid, password, file",
});
dbUser.version(1).stores({
  user: "uuid, name, lastLogin",
});
