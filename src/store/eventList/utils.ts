import _ from "lodash";

import type { ServerEventData } from "../../common/types/eventTypes.ts";
import type { RequestPayload } from "../transport/eventListTransport/types.ts";

// This is client side filtering
export const eventsFilteringEngine = (
  userFilters: RequestPayload,
  events: ServerEventData[],
): ServerEventData[] => {
  const {
    filters: { eventTitle, city, band, eventType },
  } = userFilters;

  return _.filter(events, (event: ServerEventData) => {
    const matchesEventTitle = eventTitle ? event.title.includes(eventTitle) : true;
    const matchesCity = city ? event.city.includes(city) : true;
    const matchesEventType = eventType === "All" ? true : event.category === eventType;
    let matchesArtist;

    // TODO: fix this dirty solution
    if (!("artists" in event) && !band) {
      matchesArtist = true;
    } else if (!("artists" in event) && band) {
      matchesArtist = false;
    } else {
      matchesArtist = band ? event.bands.some((singleBand) => singleBand.includes(band)) : true;
    }

    return matchesCity && matchesEventTitle && matchesArtist && matchesEventType;
  });
};
