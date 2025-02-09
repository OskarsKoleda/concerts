import type { Nullable } from "./appTypes.ts";

interface CommonEventData {
  eventType: string;
  eventTitle: string;
  bands?: string[];
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
