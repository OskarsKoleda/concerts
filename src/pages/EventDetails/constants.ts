import { EventCategory } from "../../common/enums/appEnums.ts";

import type { AuthUserProfile, LocalEventData } from "../../common/types/eventTypes.ts";

export const defaultEventValues: LocalEventData = {
  category: EventCategory.musicConcert,
  title: "",
  bands: [],
  city: "",
  date: new Date(),
  endDate: new Date(),
  ticketPrice: 0,
  location: "",
  image: undefined,
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
