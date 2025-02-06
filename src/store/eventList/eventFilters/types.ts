import type { Nullable } from "../../../common/types/appTypes";

export type EventTitleFilter = string;
export type CityFilter = string;
export type BandFilter = string;
export type EventTypeFilter = EventType;

export enum EventType {
  concert = "Concert",
  festival = "Festival",
  theatre = "Theatre",
  all = "All",
}

export interface EventFilterOptions {
  eventType: string;
  eventTitle: Nullable<string>;
  city: Nullable<string>;
  band: Nullable<string>;
}

export interface IEventFilters {
  readonly eventTitle: string;
  readonly city: CityFilter;
  readonly eventType: string;
  readonly band: string;
}
