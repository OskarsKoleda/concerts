import type { EventCategoryType } from "../../pages/EventDetails/types.ts";
import type { Nullable } from "./appTypes.ts";

interface CommonEventData {
  eventCategory: EventCategoryType;
  eventTitle: string;
  artists: string[];
  city: string;
  location?: string;
  ticketPrice?: number;
}

export type LocalEventData = CommonEventData & {
  // posterUrl?: string;
  posterImage: Nullable<File>;
  eventDate?: Date;
  festivalStartDate?: Date;
  festivalEndDate?: Date;
};

export type ServerEventData = CommonEventData & {
  posterImageUrl?: string;
  publicPosterImageId?: string;
  eventDate?: string;
  festivalStartDate?: string;
  festivalEndDate?: string;
};

export type ServerEventDataWithId = ServerEventData & { eventId: string };
