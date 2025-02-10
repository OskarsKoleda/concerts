import { makeAutoObservable, reaction, runInAction } from "mobx";

import { appendEventIdToServerEvent, eventsFilteringEngine } from "../../common/utils/utility";

import type { ServerEventData, ServerEventDataWithId } from "../../common/types/eventTypes.ts";
import type { EventListTransport } from "../transport/eventListTransport/EventListTransport.ts";
import type { RequestPayload } from "../transport/eventListTransport/types";
import { EventListRequests } from "../transport/eventListTransport/constants.ts";
import { EventFiltersStore } from "./eventFilters/EventFiltersStore.ts";

export class EventListStore {
  events: ServerEventDataWithId[] = [];
  eventsFilters: EventFiltersStore;
  eventListTransport: EventListTransport;

  constructor(eventListTransport: EventListTransport) {
    makeAutoObservable(this);
    this.eventListTransport = eventListTransport;
    this.setupEventsListener();
    this.eventsFilters = new EventFiltersStore({
      city: "",
      eventTitle: "",
      eventType: "Music Concert",
      band: "",
    });

    /*reaction(
      () => this.fetchEventsPayload.filters,
      () => {
        // you can reset something here, like pagination, sorting
      },
      { equals: comparer.default },
    );*/

    reaction(
      () => this.fetchEventsPayload,
      () => this.getAllEvents(),
      { delay: 500 },
    );
  }

  // public get isLoading(): boolean {
  //   const { isProcessingRequest } = this.transport.requestHandler;

  //   return isProcessingRequest(ConcertRequests.getConcertsData);
  // }

  public get concertsCompletedLoading(): boolean {
    const { isSuccessfulRequest } = this.eventListTransport.requestHandler;

    return isSuccessfulRequest(EventListRequests.getEventsData);
  }

  // public get isDeletionSuccessful(): boolean {
  //   const { isSuccessfulRequest } = this.concertTransport.requestHandler;
  //   return isSuccessfulRequest(ConcertRequests.deleteConcert);
  // }

  private get fetchEventsPayload(): RequestPayload {
    return {
      filters: {
        city: this.eventsFilters.city,
        eventTitle: this.eventsFilters.eventTitle,
        eventType: this.eventsFilters.eventType,
        band: this.eventsFilters.band,
      },
    };
  }

  private filterEvents = (formattedEvents: ServerEventDataWithId[]) => {
    return eventsFilteringEngine(this.fetchEventsPayload, formattedEvents);

    // runInAction(() => {
    //   this.setEvents(filteredConcerts);
    // });
  };

  public getAllEvents = async (): Promise<void> => {
    const allEvents: ServerEventData | undefined = await this.eventListTransport.getAllEvents();

    if (allEvents) {
      const formattedEvents: ServerEventDataWithId[] = appendEventIdToServerEvent(allEvents);
      const filteredEvents: ServerEventDataWithId[] = this.filterEvents(formattedEvents);

      this.setEvents(filteredEvents);
    } else {
      this.setEvents([]);
    }
  };

  private setEvents = (events: ServerEventDataWithId[]): void => {
    this.events = events;
  };

  // TODO: check is it necessary to unsubscribe manually somehow
  private setupEventsListener = (): void => {
    this.eventListTransport.eventsListener((events: ServerEventDataWithId[]) => {
      runInAction(() => {
        this.setEvents(events);
      });
    });
  };
}
