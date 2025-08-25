import _ from "lodash";

import type { LocalEventData, ServerEventData } from "../../../common/types/eventTypes.ts";

// TODO: to Local => to Event Form data? Check this
export const convertServerEventToLocal = (serverEvent: ServerEventData): LocalEventData => {
  const { slug, url, ...rest } = serverEvent;

  return rest;
};

export const getChangedFields = (
  updatedEvent: LocalEventData,
  originalEvent: LocalEventData,
): Partial<LocalEventData> => {
  return _.pickBy(
    updatedEvent,
    (value, key) => !_.isEqual(value, originalEvent[key as keyof LocalEventData]),
  );
};
