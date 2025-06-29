import type { EventCategoryType } from "../../pages/EventDetails/types.ts";

export type LocalEventData = CommonEventData & {
  posterImage?: FileList;
  eventDate?: Date;
  festivalEndDate?: Date;
};

export type ServerEventDataWithId = ServerEventData & { eventId: string };

export type ServerEventData = CommonEventData & {
  posterImageUrl?: string;
  posterImageTitle?: string;
  eventDate?: string;
  festivalEndDate?: string;
};

interface CommonEventData {
  eventCategory: EventCategoryType;
  eventTitle: string;
  city: string;
  artists: string[];
  location?: string;
  ticketPrice?: number;
}

export type AuthUserProfile = UserProfile & {
  password: string;
};

export type LocalUserProfile = {
  uid: string;
} & UserProfile;

interface UserProfile {
  username: string;
  email: string;
}
