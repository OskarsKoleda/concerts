import type { FirebaseApp } from "firebase/app";
import { getApps, initializeApp } from "firebase/app";

import "firebase/database";

import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "./configurations";

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getDatabase(app);
export const storage = getStorage(app);
