import type { LocalEventData } from "../../common/types/eventTypes.ts";
import { EventCategory } from "../../common/enums/appEnums.ts";

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
  posterImage: undefined,
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
