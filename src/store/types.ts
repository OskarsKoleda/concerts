import type { ConcertData } from "../common/types/concert";

export type FirebaseResponse = {
  status: string;
  message: string;
  concert?: ConcertData;
  concerts?: ConcertData[];
};
