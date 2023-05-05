import { app } from "@/FirebaseSdk/index";
import { getAuth, signOut } from "firebase/auth";
import { deleteUserRegisterById, getUserData } from "./localUserData";

/**
 *
 * @param {String} email
 * @param {String} password
 * @returns {Promise<object>}
 */
export default async function logout() {
  const auth = getAuth(app);
  await signOut(auth);
  const user = await getUserData();
  deleteUserRegisterById(user.at(0).uuid);
}
