import { makeAutoObservable } from "mobx";
import {
  type BandFilter,
  type CityFilter,
  type EventCategoryFilter,
  type EventFilterOptions,
  type EventTitleFilter,
  type IEventFilters,
} from "./types";

export class EventFiltersStore implements IEventFilters {
  eventTitle: EventTitleFilter;
  city: CityFilter;
  band: BandFilter;
  eventType: EventCategoryFilter;

  constructor(options: EventFilterOptions) {
    makeAutoObservable(this);
    this.eventTitle = options.eventTitle ?? "";
    this.city = options.city ?? "";
    this.band = options.band ?? "";
    this.eventType = "All";
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

  setEventType = (eventType: EventCategoryFilter): void => {
    this.eventType = eventType;
  };

  resetFilters = (): void => {
    this.eventTitle = "";
    this.city = "";
    this.band = "";
    this.eventType = "All";
  };
}
