import { makeAutoObservable, reaction, runInAction, toJS } from "mobx";

import type { ServerEventDataWithId } from "../../common/types/eventTypes.ts";
import type { EventListTransport } from "../transport/eventListTransport/EventListTransport.ts";
import type { RequestPayload } from "../transport/eventListTransport/types";
import { EventListRequests } from "../transport/eventListTransport/constants.ts";
import { EventCategory } from "../../common/enums/appEnums.ts";

import { EventFiltersStore } from "./eventFilters/EventFiltersStore.ts";
import { eventsFilteringEngine } from "./utils.ts";

export class EventListStore {
  events: ServerEventDataWithId[] = [];
  eventsFilters: EventFiltersStore;
  eventListTransport: EventListTransport;
  cleanupEventsListener?: () => void;

  constructor(eventListTransport: EventListTransport) {
    makeAutoObservable(this);
    this.eventListTransport = eventListTransport;
    this.eventsFilters = new EventFiltersStore({
      eventTitle: "",
      city: "",
      band: "",
      eventType: EventCategory.theatre,
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
      { delay: 300 },
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
        eventTitle: this.eventsFilters.eventTitle,
        city: this.eventsFilters.city,
        band: this.eventsFilters.band,
        eventType: this.eventsFilters.eventType,
      },
    };
  }

  private filterEvents = (events: ServerEventDataWithId[]) => {
    return eventsFilteringEngine(this.fetchEventsPayload, events);

    // runInAction(() => {
    //   this.setEvents(filteredConcerts);
    // });
  };

  public getAllEvents = async (): Promise<void> => {
    const allEvents: ServerEventDataWithId[] | undefined =
      await this.eventListTransport.getAllEvents();

    if (!allEvents) {
      this.setEvents([]);

      return;
    }

    const filteredEvents: ServerEventDataWithId[] = this.filterEvents(allEvents);

    this.setEvents(filteredEvents);
  };

  public setupEventsListener = (): void => {
    this.cleanupEventsListener = this.eventListTransport.eventsListener(
      (events: ServerEventDataWithId[]) => {
        runInAction(() => {
          this.setEvents(events);
        });
      },
    );
  };

  private setEvents = (events: ServerEventDataWithId[]): void => {
    this.events = toJS(events);
  };

  public cleanupListener = (): void => {
    if (this.cleanupEventsListener) {
      this.cleanupEventsListener();
    }
  };
}
