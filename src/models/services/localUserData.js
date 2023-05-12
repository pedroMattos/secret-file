import { dbUser } from "@/Dexie";

export function saveUserData(user) {
  const date = new Date();
  return dbUser.user.add({
    uuid: user.uuid,
    email: user.email,
    lastLogin: date.getTime(),
    userName: user.displayName,
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

export function updateUser(userDataUid, name) {
  return dbUser.user.update(userDataUid, { userName: name });
}
