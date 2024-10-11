import { getApps, initializeApp } from "firebase/app";
import "firebase/database";
import { getDatabase } from "firebase/database";

import { firebaseConfig } from "./configurations";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getDatabase();

export { db };
