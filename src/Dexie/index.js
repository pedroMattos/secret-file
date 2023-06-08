import Dexie from "dexie";

export const db = new Dexie("myFiles");
export const dbUser = new Dexie("userData");
db.version(7).stores({
  files:
    "++id, name, content, uuid, password, file, inCloud, fileType, cloudId, encryptedPassword, protected",
});
dbUser.version(2).stores({
  user: "uuid, name, lastLogin, userName",
});
