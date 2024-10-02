import _ from "lodash";

import { ERROR_TEXTS } from "../constants/appConstant";

import type { RequestPayload } from "../../store/transport/concertTransport/types";
import type { FieldError } from "react-hook-form";
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
    filters: { city, eventTitle, eventType },
  } = userFilters;

  const filteredConcerts = _.filter(concerts, (concert: ConcertFormattedData) => {
    const matchesCity = city ? concert.city.includes(city) : true;
    const matchesEventTitle = eventTitle ? concert.title.includes(eventTitle) : true;
    const matchesEventType = eventType ? concert.eventType === eventType : true;

    return matchesCity && matchesEventTitle && matchesEventType;
  });

  return filteredConcerts;
};
