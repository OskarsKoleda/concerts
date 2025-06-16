import _ from "lodash";

import type { ServerEventData, ServerEventDataWithId } from "../../common/types/eventTypes.ts";
import type { RequestPayload } from "../transport/eventListTransport/types.ts";

// This is client side filtering
export const eventsFilteringEngine = (
  userFilters: RequestPayload,
  events: ServerEventDataWithId[],
): ServerEventDataWithId[] => {
  const {
    filters: { eventTitle, city, band, eventType },
  } = userFilters;

  return _.filter(events, (event: ServerEventData) => {
    const matchesEventTitle = eventTitle ? event.eventTitle.includes(eventTitle) : true;
    const matchesCity = city ? event.city.includes(city) : true;
    const matchesEventType = eventType === "All" ? true : event.eventCategory === eventType;
    let matchesArtist;

    // TODO: fix this dirty solution
    if (!("artists" in event) && !band) {
      matchesArtist = true;
    } else if (!("artists" in event) && band) {
      matchesArtist = false;
    } else {
      matchesArtist = band ? event.artists.some((singleBand) => singleBand.includes(band)) : true;
    }

    return matchesCity && matchesEventTitle && matchesArtist && matchesEventType;
  });
};
