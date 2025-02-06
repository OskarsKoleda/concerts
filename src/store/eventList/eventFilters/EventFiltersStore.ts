import { makeAutoObservable } from "mobx";

import {
  type BandFilter,
  type CityFilter,
  type EventFilterOptions,
  type EventTitleFilter,
  EventType,
  type EventTypeFilter,
  type IEventFilters,
} from "./types";

export class EventFiltersStore implements IEventFilters {
  eventTitle: EventTitleFilter;
  eventType: EventTypeFilter;
  city: CityFilter;
  band: BandFilter;

  constructor(options: EventFilterOptions) {
    makeAutoObservable(this);
    this.eventTitle = options.eventTitle ?? "";
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
