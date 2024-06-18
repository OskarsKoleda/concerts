import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAWp6EczcIvriXy-Oq6NNAYdCHKc8X8fUk",
  authDomain: "metal-concerts.firebaseapp.com",
  databaseURL:
    "https://metal-concerts-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "metal-concerts",
  storageBucket: "metal-concerts.appspot.com",
  messagingSenderId: "647561205187",
  appId: "1:647561205187:web:04e593b6ed5c48e75d1976",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getDatabase();

export { db };
