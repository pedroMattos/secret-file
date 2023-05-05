import { app } from "@/FirebaseSdk/index";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @returns {Promise<object>}
 */
export default function loginWithEmail(email, password) {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, email, password)
}