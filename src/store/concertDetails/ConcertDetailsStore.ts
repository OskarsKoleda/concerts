import { makeAutoObservable } from "mobx";

import type { ConcertData } from "../../common/types/concert";
import type { ConcertDetailsTransport } from "../transport/concertDetailsTransport/ConcertDetailsTransport";
import type { FirebaseResponse } from "../types";

export class ConcertDetailsStore {
  concertId: string;
  concertDetailsTransport: ConcertDetailsTransport;

  constructor(concertDetailsTransport: ConcertDetailsTransport) {
    makeAutoObservable(this);
    this.concertDetailsTransport = concertDetailsTransport;
    this.concertId = "";
  }

  public addConcert = async (concert: ConcertData): Promise<void> => {
    await this.concertDetailsTransport.addConcert(concert);
  };

  public getConcert = async (id: string): Promise<FirebaseResponse> => {
    this.concertId = id;

    return this.concertDetailsTransport.getConcert(id);
  };

  public updateConcert = async (concert: ConcertData, id: string): Promise<FirebaseResponse> => {
    return this.concertDetailsTransport.updateConcert(concert, id);
  };

  public deleteConcert = async (id: string): Promise<FirebaseResponse> => {
    return this.concertDetailsTransport.deleteConcert(id);
  };

  public get currentConcertId(): string {
    return this.concertId;
  }
}
