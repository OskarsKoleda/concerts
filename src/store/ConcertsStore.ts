import { makeAutoObservable, runInAction } from "mobx";
import { ConcertTransport } from "./transport/ConcertTransport";
import { Database } from "firebase/database";
import { ConcertData, ConcertFormattedData } from "../common/types/concert";
import { transformFirebaseObject } from "../common/utils/utility";

class ConcertStore {
  concerts: ConcertFormattedData[] = [];
  concertTransport: ConcertTransport;
  loading: boolean = false;
  error: string | null = null;

  constructor(db: Database) {
    this.concertTransport = new ConcertTransport(db);
    makeAutoObservable(this);
  }

  fetchAllConcerts = async () => {
    this.loading = true;
    this.error = null;
    try {
      const data = await this.concertTransport.fetchAllConcerts();
      runInAction(() => {
        if (data) {
          const formattedConcerts: ConcertFormattedData[] = transformFirebaseObject(data);
          this.setConcerts(formattedConcerts);
        } else {
          this.concerts = [];
        }
        this.loading = false;
      });
    } catch (error: any) {
      // what is this function?
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
      console.error("Error fetching concerts:", error);
    }
  };

  setConcerts = (concerts: ConcertFormattedData[]) => {
    this.concerts = concerts;
  };

  addConcert = async (concert: ConcertData) => {
    try {
      await this.concertTransport.addConcert(concert);
      this.fetchAllConcerts();
    } catch (error) {
      console.error("Error adding concert:", error);
    }
  };

  deleteConcert = async (id: string) => {
    try {
      await this.concertTransport.deleteConcert(id);
      this.fetchAllConcerts();
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
      });
    }
  };

  clearConcerts = () => {
    this.concerts = [];
  };
}

export default ConcertStore;
