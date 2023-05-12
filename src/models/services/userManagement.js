import { app } from "@/FirebaseSdk/index";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { updateUser } from "./localUserData";

export function createUserWithEmail(email, password) {
  const auth = getAuth(app);

  return createUserWithEmailAndPassword(auth, email, password);
}

export function newUserCreateDocument(documentRef) {
  const dbReference = getFirestore(app);
  const collectionRef = collection(
    dbReference,
    process.env.VUE_APP_COLLECTION_NAME
  );
  return setDoc(doc(collectionRef, documentRef), { files: [] });
}

export function updateUserData(userData) {
  const auth = getAuth(app);
  updateProfile(auth.currentUser, { ...userData }).then(() => {
    updateUser(auth.currentUser.uid, auth.currentUser.displayName);
  });
}
