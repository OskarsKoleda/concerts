import type { Nullable } from "../../../common/types/appTypes";

export type EventTitleFilter = string;
export type CityFilter = string;

export interface ConcertsFilterOptions {
  concertTitle: Nullable<string>;
  city: Nullable<string>;
}

export interface IConcertFilters {
  readonly eventTitle: string;
  readonly city: string;
}
