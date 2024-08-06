import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

import "firebase/database";
import conf from "./configurations";

if (!getApps().length) {
  initializeApp(conf);
}
const db = getDatabase();

export { db };
