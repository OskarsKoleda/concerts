import _ from "lodash";

import type { FieldError } from "react-hook-form";
import { ERROR_TEXTS } from "../constants/appConstant";

import type { RequestPayload } from "../../store/transport/eventListTransport/types";
import type { ServerEventData, ServerEventDataWithId } from "../types/eventTypes.ts";

export const appendEventIdToServerEvent = (events: ServerEventData): ServerEventDataWithId[] => {
  return Object.entries(events).map(([eventId, event]) => ({
    ...event,
    id: eventId,
  }));
};

export const getInputErrorText = (error: FieldError): string | null => {
  if (!error) {
    return null;
  }

  const supportedText = ERROR_TEXTS[error.type];
  const errorText = error.message;

  return supportedText || errorText || null;
};

export const eventsFilteringEngine = (
  userFilters: RequestPayload,
  events: ServerEventDataWithId[],
): ServerEventDataWithId[] => {
  const {
    filters: { eventTitle, eventType, city },
  } = userFilters;

  return _.filter(events, (concert: ServerEventData) => {
    const matchesEventTitle = eventTitle ? concert.eventTitle.includes(eventTitle) : true;
    const matchesCity = city ? concert.city.includes(city) : true;
    // const matchesBand = band ? concert.bands.some((singleBand) => singleBand.includes(band)) : true;
    let matchesEventType: boolean;

    if (eventType !== "All") {
      matchesEventType = eventType ? concert.eventCategory === eventType : true;
    } else {
      matchesEventType = true;
    }

    return matchesCity && matchesEventTitle && matchesEventType;
  });
};
