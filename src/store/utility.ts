import type { ServerEventData, ServerEventDataWithId } from "../common/types/eventTypes.ts";

export const appendEventIdToServerEvent = (events: ServerEventData): ServerEventDataWithId[] => {
  return Object.entries(events).map(([eventId, event]) => ({
    ...event,
    eventId,
  }));
};
