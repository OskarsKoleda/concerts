import type { EventCategoryType } from "../../pages/EventDetails/types.ts";

export type LocalEventData = CommonEventData & {
  image?: FileList;
};

export type ServerEventData = CommonEventData & {
  slug: string;
  url?: string;
  owner: Owner;
  isVisited: boolean;
};

interface Owner {
  id: string;
  name: string;
}

export interface CommonEventData {
  title: string;
  category: EventCategoryType;
  bands?: string[];
  city: string;
  date: string;
  endDate?: string;
  location?: string;
  ticketPrice?: number;
}
