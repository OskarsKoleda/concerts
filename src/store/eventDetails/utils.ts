import type { LocalEventData, ServerEventData } from "../../common/types/eventTypes.ts";

export const convertServerEventToLocal = (serverEvent: ServerEventData): LocalEventData => {
  return {
    ...serverEvent,
    posterImage: undefined,
    eventDate: serverEvent.eventDate ? new Date(serverEvent.eventDate) : undefined,
    festivalEndDate: serverEvent.festivalEndDate
      ? new Date(serverEvent.festivalEndDate)
      : undefined,
  };
};
