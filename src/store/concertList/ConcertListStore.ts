import { makeAutoObservable, reaction, runInAction } from "mobx";

import { concertsFilteringEngine, transformFirebaseObject } from "../../common/utils/utility";
import { ConcertListRequests } from "../transport/concertListTransport/constants";

import { ConcertsFiltersStore } from "./concertFilters/ConcertsFiltersStore";

import type { ConcertFormattedData, ConcertRawData } from "../../common/types/concert";
import type { ConcertListTransport } from "../transport/concertListTransport/ConcertListTransport";
import type { RequestPayload } from "../transport/concertListTransport/types";

class ConcertListStore {
  concerts: ConcertFormattedData[] = [];
  concertsFilters: ConcertsFiltersStore;
  concertListTransport: ConcertListTransport;

  constructor(concertTransport: ConcertListTransport) {
    makeAutoObservable(this);
    this.concertListTransport = concertTransport;
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

  // public get isLoading(): boolean {
  //   const { isProcessingRequest } = this.transport.requestHandler;

  //   return isProcessingRequest(ConcertRequests.getConcertsData);
  // }

  public get concertsCompletedLoading(): boolean {
    const { isSuccessfulRequest } = this.concertListTransport.requestHandler;

    return isSuccessfulRequest(ConcertListRequests.getConcertsData);
  }

  // public get isDeletionSuccessful(): boolean {
  //   const { isSuccessfulRequest } = this.concertTransport.requestHandler;
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

  private filterConcerts = (formattedConcerts: ConcertFormattedData[]) => {
    return concertsFilteringEngine(this.fetchConcertsPayload, formattedConcerts);

    // runInAction(() => {
    //   this.setConcerts(filteredConcerts);
    // });
  };

  public loadConcerts = async (): Promise<void> => {
    const data: ConcertRawData | undefined = await this.concertListTransport.fetchConcerts();
    // const { eventType } = this.fetchConcertsPayload.filters;

    if (data) {
      const formattedConcerts: ConcertFormattedData[] = transformFirebaseObject(data);
      const filteredConcerts: ConcertFormattedData[] = this.filterConcerts(formattedConcerts);

      this.setConcerts(filteredConcerts);
    } else {
      this.setConcerts([]);
    }
  };

  private setConcerts = (concerts: ConcertFormattedData[]): void => {
    this.concerts = concerts;
  };

  private setupConcertsListener = (): void => {
    this.concertListTransport.concertsListener((concerts: ConcertFormattedData[]) => {
      runInAction(() => {
        this.setConcerts(concerts);
      });
    });
  };
}

export default ConcertListStore;
