import { makeAutoObservable } from "mobx";

import type { CityFilter, ConcertsFilterOptions, EventTitleFilter, IConcertFilters } from "./types";

export class ConcertsFiltersStore implements IConcertFilters {
  eventTitle: EventTitleFilter;
  city: CityFilter;

  constructor(options: ConcertsFilterOptions) {
    makeAutoObservable(this);
    this.eventTitle = options.concertTitle ?? "";
    this.city = options.city ?? "";
  }

  setEventTitle = (eventTitle: EventTitleFilter): void => {
    this.eventTitle = eventTitle;
  };

  setCity = (city: CityFilter): void => {
    this.city = city;
  };

  resetFilters = (): void => {
    this.eventTitle = "";
    this.city = "";
  };
}
