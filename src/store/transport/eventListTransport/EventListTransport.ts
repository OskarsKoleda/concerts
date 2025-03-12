import type { Database } from "firebase/database";
import { get, onValue, query, ref } from "firebase/database";
import { makeAutoObservable } from "mobx";

import { getRequestContext } from "../rootTransport/utils";

import type { ServerEventData, ServerEventDataWithId } from "../../../common/types/eventTypes.ts";
import type { RequestHandler } from "../requestHandler/RequestHandler";
import type { ChildTransport, RequestContext } from "../rootTransport/types";
import { appendEventIdToServerEvent } from "../../utils.ts";
import { EventListRequests, requestErrorMessages } from "./constants";

export class EventListTransport implements ChildTransport {
  constructor(
    readonly db: Database,
    readonly requestHandler: RequestHandler,
  ) {
    makeAutoObservable(this);
  }

  private getRequestContextHelper = (requestName: EventListRequests): RequestContext => {
    return getRequestContext(requestName, this.requestHandler, requestErrorMessages);
  };

  eventsListener = (callback: (concerts: ServerEventDataWithId[]) => void) => {
    const eventsRef = ref(this.db, "/events");

    return onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formattedConcerts: ServerEventDataWithId[] = appendEventIdToServerEvent(data);

        callback(formattedConcerts);
      } else {
        callback([]);
      }
    });
  };

  getAllEvents = async (): Promise<ServerEventData | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventListRequests.getEventsData);

    try {
      request.inProgress();
      const eventsQuery = query(
        ref(this.db, "/events"),
        // orderByChild("eventDate"),
        // startAt("2025-01-01"),
      );
      const snapshot = await get(eventsQuery);

      request.success();

      return snapshot.val();
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };
}
