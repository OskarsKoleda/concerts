import type { AuthUserProfile, LocalEventData } from "../../common/types/eventTypes.ts";
import { EventCategory } from "../../common/enums/appEnums.ts";

export const defaultEventValues: LocalEventData = {
  eventCategory: EventCategory.musicConcert,
  eventTitle: "",
  artists: [],
  city: "",
  eventDate: new Date(),
  festivalEndDate: new Date(),
  ticketPrice: 0,
  location: "",
  posterImage: undefined,
};

export const defaultUserValues: AuthUserProfile = {
  email: "",
  password: "",
  username: "",
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
