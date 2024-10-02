import type { Nullable } from "../../../common/types/appTypes";

export type EventTitleFilter = string;
export type CityFilter = string;
export type EventTypeFilter = "Concert" | "Festival" | "All";

export interface ConcertsFilterOptions {
  concertTitle: Nullable<string>;
  city: Nullable<string>;
  eventType: string;
}

export interface IConcertFilters {
  readonly eventTitle: string;
  readonly city: string;
  readonly eventType: string;
}
