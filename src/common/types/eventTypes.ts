import type { EventCategoryType } from "../../pages/EventDetails/types.ts";

interface CommonEventData {
  eventCategory: EventCategoryType;
  eventTitle: string;
  artists: string[];
  city: string;
  location?: string;
  ticketPrice?: number;
}

export type LocalEventData = CommonEventData & {
  posterImage?: FileList;
  eventDate?: Date;
  festivalStartDate?: Date;
  festivalEndDate?: Date;
};

export type ServerEventData = CommonEventData & {
  posterImageUrl?: string;
  posterImageTitle?: string;
  eventDate?: string;
  festivalStartDate?: string;
  festivalEndDate?: string;
};

export type ServerEventDataWithId = ServerEventData & { eventId: string };
