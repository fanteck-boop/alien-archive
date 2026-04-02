import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnhmHcizv15qKBKhZoUNuTM0J9SRW9xqQ",
  authDomain: "alien-website-5dada.firebaseapp.com",
  projectId: "alien-website-5dada",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
