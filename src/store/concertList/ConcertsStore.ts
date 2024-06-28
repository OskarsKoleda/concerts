import { makeAutoObservable, runInAction } from "mobx";
import { ConcertTransport } from "../transport/concertTransport/ConcertTransport";
import { ConcertData, ConcertFormattedData, ConcertRawData } from "../../common/types/concert";
import { transformFirebaseObject } from "../../common/utils/utility";
import { ConcertRequests } from "../transport/concertTransport/constants";

class ConcertStore {
  concerts: ConcertFormattedData[] = [];

  transport: ConcertTransport;

  constructor(concertTransport: ConcertTransport) {
    this.transport = concertTransport;
    makeAutoObservable(this);
  }

  get isLoading(): boolean {
    const { isProcessingRequest } = this.transport.requestHandler;
    
    return isProcessingRequest(ConcertRequests.getConcertData);
  }

  fetchAllConcerts = async () => {
    const data: ConcertRawData | undefined = await this.transport.fetchConcertsData();
    runInAction(() => {
      if (data) {
        const formattedConcerts: ConcertFormattedData[] = transformFirebaseObject(data);
        this.setConcerts(formattedConcerts);
      } else {
        this.concerts = [];
      }
    });
  };

  setConcerts = (concerts: ConcertFormattedData[]) => {
    this.concerts = concerts;
  };

  addConcert = async (concert: ConcertData) => {
    try {
      await this.transport.addConcert(concert);
      this.fetchAllConcerts();
    } catch (error) {
      console.error("Error adding concert:", error);
    }
  };

  deleteConcert = async (id: string) => {
    try {
      await this.transport.deleteConcert(id);
      this.fetchAllConcerts();
    } catch (error: any) {
      runInAction(() => {});
    }
  };
}

export default ConcertStore;
