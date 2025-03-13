import type { Database, DataSnapshot, IteratedDataSnapshot } from "firebase/database";
import { get, onValue, orderByChild, query, ref } from "firebase/database";
import { makeAutoObservable } from "mobx";

import { getRequestContext } from "../rootTransport/utils";

import type { ServerEventDataWithId } from "../../../common/types/eventTypes.ts";
import type { RequestHandler } from "../requestHandler/RequestHandler";
import type { ChildTransport, RequestContext } from "../rootTransport/types";
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
    const eventsQuery = query(eventsRef, orderByChild("eventDate"));

    return onValue(eventsQuery, (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);

        return;
      }

      const eventsWithIds: ServerEventDataWithId[] = this.appendEventId(snapshot);

      callback(eventsWithIds);
    });
  };

  getAllEvents = async (): Promise<ServerEventDataWithId[] | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventListRequests.getEventsData);
    const eventsRef = ref(this.db, "/events");
    const eventsQuery = query(eventsRef, orderByChild("eventDate"));

    try {
      request.inProgress();

      const snapshot = await get(eventsQuery);

      request.success();

      if (!snapshot.exists()) {
        return [];
      }

      return this.appendEventId(snapshot);
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };

  private appendEventId = (eventsSnapshot: DataSnapshot): ServerEventDataWithId[] => {
    const events: ServerEventDataWithId[] = [];

    eventsSnapshot.forEach((childSnapshot: IteratedDataSnapshot) => {
      events.push({ eventId: childSnapshot.key, ...childSnapshot.val() });
    });

    return events;
  };
}
