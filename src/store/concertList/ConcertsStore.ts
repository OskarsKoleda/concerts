import { makeAutoObservable, runInAction } from "mobx";

import { transformFirebaseObject } from "../../common/utils/utility";
import { ConcertRequests } from "../transport/concertTransport/constants";

import type { FirebaseResponse } from "../types";
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

  // public get isDeletionSuccessful(): boolean {
  //   const { isSuccessfulRequest } = this.transport.requestHandler;
  //   return isSuccessfulRequest(ConcertRequests.deleteConcert);
  // }

  public loadConcerts = async () => {
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

  private setConcerts = (concerts: ConcertFormattedData[]): void => {
    this.concerts = concerts;
  };

  public addConcert = async (concert: ConcertData): Promise<void> => {
    await this.transport.addConcert(concert);
  };

  public getConcert = async (id: string): Promise<FirebaseResponse> => {
    return this.transport.getConcert(id);
  };

  public updateConcert = async (concert: ConcertData, id: string): Promise<FirebaseResponse> => {
    return this.transport.updateConcert(concert, id);
  };

  public deleteConcert = async (id: string): Promise<FirebaseResponse> => {
    return this.transport.deleteConcert(id);
  };

  private setupConcertsListener = (): void => {
    this.transport.concertsListener((concerts: ConcertFormattedData[]) => {
      runInAction(() => {
        this.setConcerts(concerts);
      });
    });
  };
}

export default ConcertStore;
