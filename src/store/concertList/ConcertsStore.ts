import { makeAutoObservable, runInAction } from "mobx";

import { transformFirebaseObject } from "../../common/utils/utility";
import { ConcertRequests } from "../transport/concertTransport/constants";

import type { ConcertTransport } from "../transport/concertTransport/ConcertTransport";
import type { ConcertData, ConcertFormattedData, ConcertRawData } from "../../common/types/concert";

class ConcertStore {
  concerts: ConcertFormattedData[] = [];

  transport: ConcertTransport;

  constructor(concertTransport: ConcertTransport) {
    makeAutoObservable(this);
    this.transport = concertTransport;
  }

  public get isLoading(): boolean {
    console.log("isLoading: ");

    const { isProcessingRequest } = this.transport.requestHandler;

    return isProcessingRequest(ConcertRequests.getConcertsData);
  }

  public get isDeletionSuccessful(): boolean {
    console.log("isDeletionSuccessful: ");
    
    const { isSuccessfulRequest } = this.transport.requestHandler;

    return isSuccessfulRequest(ConcertRequests.deleteConcert);
  }

  loadConcerts = async () => {
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
    await this.transport.addConcert(concert);
    // this.loadConcerts();
  };

  getConcert = async (id: string): Promise<ConcertData | undefined> => {
    if (id) {
      const concert: ConcertData = await this.transport.getConcert(id);

      return concert;
    }
  };

  updateConcert = async (concert: ConcertData, id: string) => {
    await this.transport.updateConcert(concert, id);
  };

  deleteConcert = async (id: string) => {
    await this.transport.deleteConcert(id);
    // this.loadConcerts();
  };
}

export default ConcertStore;
