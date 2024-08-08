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
    this.setupConcertsListener();
  }

  public get isLoading(): boolean {
    const { isProcessingRequest } = this.transport.requestHandler;

    return isProcessingRequest(ConcertRequests.getConcertsData);
  }

  public get isDeletionSuccessful(): boolean {
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

  deleteConcert = async (id: string): Promise<Record<string, string>> => {
    return this.transport.deleteConcert(id);
  };

  private setupConcertsListener = () => {
    this.transport.concertsListener((concerts: ConcertFormattedData[]) => {
      runInAction(() => {
        this.setConcerts(concerts);
      });
    });
  };
}

export default ConcertStore;
