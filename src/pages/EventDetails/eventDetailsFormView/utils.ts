import _ from "lodash";

import type { LocalEventData, ServerEventData } from "../../../common/types/eventTypes.ts";

// TODO: rework this. No poster name available
export const convertServerEventToLocal = (serverEvent: ServerEventData): LocalEventData => {
  return _.omit(serverEvent, ["slug", "url"]);
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
