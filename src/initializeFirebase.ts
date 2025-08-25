import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import firebaseConfiguration from "./firebaseConfig.ts";

import type { FirebaseApp } from "firebase/app";

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfiguration);
} else {
  app = getApps()[0];
}

export const db = getDatabase(app);
export const auth = getAuth(app);
