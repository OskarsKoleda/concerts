import type { LocalEventData } from "../../common/types/eventTypes.ts";
import type { EventCategoryType } from "./types.ts";

export enum EventCategory {
  musicConcert = "Music Concert",
  musicFestival = "Music Festival",
  theatre = "Theatre",
  creativeEvening = "Creative Evening",
}

export const eventCategoriesList: EventCategoryType[] = Object.values(EventCategory);

export const defaultValues: LocalEventData = {
  eventCategory: EventCategory.musicConcert,
  eventTitle: "",
  artists: [],
  city: "",
  eventDate: new Date(),
  festivalStartDate: new Date(),
  festivalEndDate: new Date(),
  ticketPrice: 0,
  location: "",
  posterImage: null,
};

export const eventDetailsText = {
  ENGLISH: {
    form: {
      title: {
        editForm: "Edit Event",
        detailsForm: "Event Details",
        newForm: "New Event",
      },
    },
  },
};
