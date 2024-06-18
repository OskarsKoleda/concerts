import { makeAutoObservable, runInAction } from "mobx";
import { ConcertTransport } from "./transport/ConcertTransport";
import { Database } from "firebase/database";

interface Concert {
  id: string;
  band: string;
  city: string;
  year?: number;
  url: string;
}

class ConcertStore {
  concerts: Concert[] = [];
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
          this.setConcerts(
            Object.keys(data).map((key) => ({
              ...data[key],
              id: key,
            })),
          );
        } else {
          this.concerts = [];
        }
        this.loading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
      console.error("Error fetching concerts:", error);
    }
  };

  setConcerts = (concerts: Concert[]) => {
    this.concerts = concerts;
  };

  addConcert = async (concert: Concert) => {
    try {
      const data = await this.concertTransport.addConcert(concert);
      console.log("created: ", data);
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
