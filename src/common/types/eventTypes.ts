import type { EventCategoryType } from "../../pages/EventDetails/types.ts";

export type LocalEventData = CommonEventData & {
  image?: FileList;
};

export type ServerEventData = CommonEventData & {
  slug: string;
  url?: string;
};

interface CommonEventData {
  title: string;
  category: EventCategoryType;
  bands: string[];
  city: string;
  date: string;
  endDate?: string;
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
