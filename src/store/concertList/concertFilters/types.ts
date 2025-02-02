import type { Nullable } from "../../../common/types/appTypes";

export type EventTitleFilter = string;
export type CityFilter = string;
export type BandFilter = string;
export type EventTypeFilter = EventType;

export enum EventType {
  concert = "Concert",
  festival = "Festival",
  all = "All",
}

export interface ConcertsFilterOptions {
  eventType: string;
  concertTitle: Nullable<string>;
  city: Nullable<string>;
  band: Nullable<string>;
}

export interface IConcertFilters {
  readonly eventTitle: string;
  readonly city: CityFilter;
  readonly eventType: string;
  readonly band: string;
}
