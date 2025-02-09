import type { LocalEventData } from "../../common/types/eventTypes.ts";
import { EventType } from "../../store/eventList/eventFilters/types.ts";

export const defaultValues: LocalEventData = {
  eventType: EventType.concert,
  eventTitle: "",
  bands: [],
  city: "",
  eventDate: new Date(),
  festivalStartDate: new Date(),
  festivalEndDate: new Date(),
  ticketPrice: 0,
  location: "",
  posterImage: null,
};

export const concertText = {
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
