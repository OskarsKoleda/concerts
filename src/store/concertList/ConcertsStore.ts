import { makeAutoObservable, reaction, runInAction } from "mobx";

import { concertsFilteringEngine, transformFirebaseObject } from "../../common/utils/utility";
import { ConcertRequests } from "../transport/concertTransport/constants";

import { ConcertsFiltersStore } from "./concertFilters/ConcertsFiltersStore";

import type { RequestPayload } from "../transport/concertTransport/types";
import type { ConcertTransport } from "../transport/concertTransport/ConcertTransport";
import type { FirebaseResponse } from "../types";
import type { ConcertData, ConcertFormattedData, ConcertRawData } from "../../common/types/concert";

class ConcertStore {
  concerts: ConcertFormattedData[] = [];
  concertsFilters: ConcertsFiltersStore;
  transport: ConcertTransport;

  constructor(concertTransport: ConcertTransport) {
    makeAutoObservable(this);
    this.transport = concertTransport;
    this.setupConcertsListener();
    this.concertsFilters = new ConcertsFiltersStore({
      city: "",
      concertTitle: "",
      eventType: "Concert",
    });

    /*reaction(
      () => this.fetchConcertsPayload.filters,
      () => {
        // you can reset something here, like pagination, sorting
      },
      { equals: comparer.default },
    );*/

    reaction(
      () => this.fetchConcertsPayload,
      () => this.loadConcerts(),
      { delay: 500 },
    );
  }

  public get isLoading(): boolean {
    const { isProcessingRequest } = this.transport.requestHandler;

    return isProcessingRequest(ConcertRequests.getConcertsData);
  }

  // public get isDeletionSuccessful(): boolean {
  //   const { isSuccessfulRequest } = this.transport.requestHandler;
  //   return isSuccessfulRequest(ConcertRequests.deleteConcert);
  // }

  private get fetchConcertsPayload(): RequestPayload {
    return {
      filters: {
        city: this.concertsFilters.city,
        eventTitle: this.concertsFilters.eventTitle,
        eventType: this.concertsFilters.eventType,
      },
    };
  }

  public loadConcerts = async (): Promise<void> => {
    const data: ConcertRawData | undefined = await this.transport.fetchConcerts();
    // const { eventType } = this.fetchConcertsPayload.filters;

    if (data) {
      const formattedConcerts: ConcertFormattedData[] = transformFirebaseObject(data);
      const filteredConcerts: ConcertFormattedData[] = this.filterConcerts(formattedConcerts);

      this.setConcerts(filteredConcerts);
    } else {
      this.setConcerts([]);
    }
  };

  private filterConcerts = (formattedConcerts: ConcertFormattedData[]) => {
    return concertsFilteringEngine(this.fetchConcertsPayload, formattedConcerts);

    // runInAction(() => {
    //   this.setConcerts(filteredConcerts);
    // });
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
