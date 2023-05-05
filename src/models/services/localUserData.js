import { dbUser } from "@/Dexie";

export function saveUserData(user) {
  const date = new Date()
  return dbUser.user.add({
    uuid: user.uuid,
    email: user.email,
    lastLogin: date.getTime(),
  });
}

export function getUserData() {
  return dbUser.user.toArray();
}

export function deleteUserRegisterById(uuid) {
  dbUser.user
    .where({ uuid: uuid })
    .delete()
    .then(function (deleteCount) {
      console.log("Deleted " + deleteCount + " objects");
    });
}
