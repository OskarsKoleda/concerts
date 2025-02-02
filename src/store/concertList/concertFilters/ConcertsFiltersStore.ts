import { makeAutoObservable } from "mobx";

import {
  EventType,
  type BandFilter,
  type CityFilter,
  type ConcertsFilterOptions,
  type EventTitleFilter,
  type EventTypeFilter,
  type IConcertFilters,
} from "./types";

export class ConcertsFiltersStore implements IConcertFilters {
  eventTitle: EventTitleFilter;
  eventType: EventTypeFilter;
  city: CityFilter;
  band: BandFilter;

  constructor(options: ConcertsFilterOptions) {
    makeAutoObservable(this);
    this.eventTitle = options.concertTitle ?? "";
    this.city = options.city ?? "";
    this.band = options.band ?? "";
    this.eventType = EventType.all;
  }

  setEventTitle = (eventTitle: EventTitleFilter): void => {
    this.eventTitle = eventTitle;
  };

  setCity = (city: CityFilter): void => {
    this.city = city;
  };

  setBand = (band: BandFilter): void => {
    this.band = band;
  };

  setEventType = (eventType: EventTypeFilter): void => {
    this.eventType = eventType;
  };

  resetFilters = (): void => {
    this.eventTitle = "";
    this.city = "";
    this.band = "";
    this.eventType = EventType.all;
  };
}
