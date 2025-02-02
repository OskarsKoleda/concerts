import _ from "lodash";

import { EventType } from "../../store/concertList/concertFilters/types";
import { ERROR_TEXTS } from "../constants/appConstant";

import type { FieldError } from "react-hook-form";
import type { RequestPayload } from "../../store/transport/concertListTransport/types";
import type { ConcertFormattedData, ConcertRawData } from "../types/concert";

export function transformFirebaseObject(concerts: ConcertRawData): ConcertFormattedData[] {
  return Object.keys(concerts).map((key) => ({
    ...concerts[key],
    id: key,
  }));
}

export const getInputErrorText = (error: FieldError): string | null => {
  if (!error) {
    return null;
  }

  const supportedText = ERROR_TEXTS[error.type];
  const errorText = error.message;

  return supportedText || errorText || null;
};

export const concertsFilteringEngine = (
  userFilters: RequestPayload,
  concerts: ConcertFormattedData[],
): ConcertFormattedData[] => {
  const {
    filters: { city, eventTitle, eventType, band },
  } = userFilters;

  return _.filter(concerts, (concert: ConcertFormattedData) => {
    let matchesEventType: boolean;
    const matchesCity = city ? concert.city.includes(city) : true;
    const matchesEventTitle = eventTitle ? concert.title.includes(eventTitle) : true;
    const matchesBand = band ? concert.bands.some((singleBand) => singleBand.includes(band)) : true;

    if (eventType !== EventType.all) {
      matchesEventType = eventType ? concert.eventType === eventType : true;
    } else {
      matchesEventType = true;
    }

    return matchesCity && matchesEventTitle && matchesEventType && matchesBand;
  });
};
