import router from "@/router";
import * as user from "@/models/services/localUserData";
const VALID_TOKEN_TIMESTAMP_LIMIT = 1683300625735
function validToken(userData) {
  const date = new Date()
  const timestamp = date.getTime()
  if (timestamp - userData.at(0)?.lastLogin >= VALID_TOKEN_TIMESTAMP_LIMIT) {
    user.deleteUserRegisterById(userData.at(0)?.uuid)
    return false
  }

  return true
}

export default async function checkIsValidUser() {
  const userData = await user.getUserData()
    if (!validToken(userData)) {
      router.push("/");

      return;
    }

    return true
}