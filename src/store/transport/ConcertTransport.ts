import { Database, onValue, ref, set, push, remove } from "firebase/database";
import { makeAutoObservable } from "mobx";

interface Concert {
  band: string;
  city: string;
  year?: number;
  url: string;
}

interface ConcertData {
  [key: string]: Concert;
}

export class ConcertTransport {
  db: Database;

  constructor(db: Database) {
    this.db = db;
    makeAutoObservable(this);
  }

  fetchAllConcerts = async (): Promise<ConcertData | null> => {
    return new Promise((res, rej) => {
      const concertsRef = ref(this.db, "/concerts");
      onValue(concertsRef, (snapshot) => {
        const data: ConcertData = snapshot.val();
        if (data) {
          res(data);
        } else {
          rej(new Error("No data available!"));
        }
      });
    });
  };

  addConcert = async (concert: Concert) => {
    const newConcertRef = push(ref(this.db, "/concerts"));
    await set(newConcertRef, concert);
  };

  deleteConcert = async (id: string): Promise<void> => {
    const concertRef = ref(this.db, `/concerts/${id}`);
    await remove(concertRef);
  };
}
