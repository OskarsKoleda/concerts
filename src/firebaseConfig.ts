import type { FirebaseApp } from "firebase/app";
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import "firebase/database";

import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./configurations";

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getDatabase(app);
export const auth = getAuth(app);
