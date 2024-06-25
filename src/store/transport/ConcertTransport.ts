import { Database, onValue, ref, set, push, remove } from "firebase/database";
import { makeAutoObservable } from "mobx";
import { ConcertData, ConcertRawData } from "../../common/types/concert";

export class ConcertTransport {
  db: Database;

  constructor(db: Database) {
    this.db = db;
    makeAutoObservable(this);
  }

  fetchAllConcerts = async (): Promise<ConcertRawData | null> => {
    return new Promise((res, rej) => {
      const concertsRef = ref(this.db, "/concerts");
      onValue(concertsRef, (snapshot) => {
        const data: ConcertRawData = snapshot.val();
        if (data) {
          res(data);
        } else {
          rej(new Error("No data available!"));
        }
      });
    });
  };

  addConcert = async (concert: ConcertData) => {
    const newConcertRef = push(ref(this.db, `/concerts`));
    await set(newConcertRef, concert);
  };

  deleteConcert = async (id: string): Promise<void> => {
    const concertRef = ref(this.db, `/concerts/${id}`);
    await remove(concertRef);
  };
}
