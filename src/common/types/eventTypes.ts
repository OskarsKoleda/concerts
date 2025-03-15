import type { EventCategoryType } from "../../pages/EventDetails/types.ts";

interface CommonEventData {
  eventCategory: EventCategoryType;
  eventTitle: string;
  city: string;
  artists: string[];
  location?: string;
  ticketPrice?: number;
}

export type LocalEventData = CommonEventData & {
  posterImage?: FileList;
  eventDate?: Date;
  festivalEndDate?: Date;
};

export type ServerEventData = CommonEventData & {
  posterImageUrl?: string;
  posterImageTitle?: string;
  eventDate?: string;
  festivalEndDate?: string;
};

export type ServerEventDataWithId = ServerEventData & { eventId: string };
