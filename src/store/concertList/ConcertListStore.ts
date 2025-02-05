import { makeAutoObservable, reaction, runInAction } from "mobx";

import { appendEventIdToServerEvent, eventsFilteringEngine } from "../../common/utils/utility";
import { ConcertListRequests } from "../transport/concertListTransport/constants";

import type { ServerEventData, ServerEventDataWithId } from "../../common/types/eventTypes.ts";
import type { ConcertListTransport } from "../transport/concertListTransport/ConcertListTransport";
import type { RequestPayload } from "../transport/concertListTransport/types";
import { ConcertsFiltersStore } from "./concertFilters/ConcertsFiltersStore";

export class ConcertListStore {
  concerts: ServerEventDataWithId[] = [];
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
      band: "",
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
      () => this.loadEvents(),
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
        band: this.concertsFilters.band,
      },
    };
  }

  private filterConcerts = (formattedConcerts: ServerEventDataWithId[]) => {
    return eventsFilteringEngine(this.fetchConcertsPayload, formattedConcerts);

    // runInAction(() => {
    //   this.setConcerts(filteredConcerts);
    // });
  };

  public loadEvents = async (): Promise<void> => {
    const allEvents: ServerEventData | undefined = await this.concertListTransport.fetchEvents();

    if (allEvents) {
      const formattedConcerts: ServerEventDataWithId[] = appendEventIdToServerEvent(allEvents);
      const filteredConcerts: ServerEventDataWithId[] = this.filterConcerts(formattedConcerts);

      this.setConcerts(filteredConcerts);
    } else {
      this.setConcerts([]);
    }
  };

  private setConcerts = (concerts: ServerEventDataWithId[]): void => {
    this.concerts = concerts;
  };

  private setupConcertsListener = (): void => {
    this.concertListTransport.concertsListener((concerts: ServerEventDataWithId[]) => {
      runInAction(() => {
        this.setConcerts(concerts);
      });
    });
  };
}
