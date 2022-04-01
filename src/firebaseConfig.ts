import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJQw-BsM_BguwM-B3MD1BVdRw3Hkg4zMw",
  authDomain: "shoutouts-aed80.firebaseapp.com",
  projectId: "shoutouts-aed80",
  storageBucket: "shoutouts-aed80.appspot.com",
  messagingSenderId: "237479568100",
  appId: "1:237479568100:web:4b358d61e316abb23d42f1",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
export const storage = getStorage(app);
