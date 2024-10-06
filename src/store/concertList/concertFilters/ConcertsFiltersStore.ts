import { makeAutoObservable } from "mobx";

import type { CityFilter, ConcertsFilterOptions, EventTitleFilter, IConcertFilters } from "./types";

export class ConcertsFiltersStore implements IConcertFilters {
  eventTitle: EventTitleFilter;
  city: CityFilter;
  eventType: string;

  constructor(options: ConcertsFilterOptions) {
    makeAutoObservable(this);
    this.eventTitle = options.concertTitle ?? "";
    this.city = options.city ?? "";
    this.eventType = "All";
  }

  setEventTitle = (eventTitle: EventTitleFilter): void => {
    this.eventTitle = eventTitle;
  };

  setCity = (city: CityFilter): void => {
    this.city = city;
  };

  setEventType = (eventType: string): void => {
    this.eventType = eventType;
  };

  resetFilters = (): void => {
    this.eventTitle = "";
    this.city = "";
  };
}
