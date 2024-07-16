import { makeAutoObservable, runInAction } from "mobx";
import { ConcertTransport } from "../transport/concertTransport/ConcertTransport";
import { ConcertData, ConcertFormattedData, ConcertRawData } from "../../common/types/concert";
import { transformFirebaseObject } from "../../common/utils/utility";
import { ConcertRequests } from "../transport/concertTransport/constants";

class ConcertStore {
  concerts: ConcertFormattedData[] = [];

  currentlyViewedConcert: ConcertData | undefined;

  transport: ConcertTransport;

  constructor(concertTransport: ConcertTransport) {
    this.transport = concertTransport;
    makeAutoObservable(this);
  }

  get isLoading(): boolean {
    const { isProcessingRequest } = this.transport.requestHandler;

    return isProcessingRequest(ConcertRequests.getConcertData);
  }

  get isDeletionSuccessful(): boolean {
    const {isProcessingRequest} = this.transport.requestHandler;

    return isProcessingRequest(ConcertRequests.deleteConcert)
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

  setCurrentlyViewedConcert = (currentConcert: ConcertData) => {
    this.currentlyViewedConcert = currentConcert;
  };

  addConcert = async (concert: ConcertData) => {
    await this.transport.addConcert(concert);
    this.fetchAllConcerts();
  };

  getConcert = async (id: string | undefined) => {
    if (id) {
      const concert: ConcertData = await this.transport.getConcert(id);
      this.setCurrentlyViewedConcert(concert);
    }
  };

  deleteConcert = async (id: string) => {
    await this.transport.deleteConcert(id);
    this.fetchAllConcerts();
  };
}

export default ConcertStore;
