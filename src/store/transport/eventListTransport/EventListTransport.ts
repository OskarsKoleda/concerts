import type { Database } from "firebase/database";
import { get, onValue, ref } from "firebase/database";
import { makeAutoObservable } from "mobx";

import { appendEventIdToServerEvent } from "../../../common/utils/utility";
import { getRequestContext } from "../rootTransport/utils";

import type { ServerEventData, ServerEventDataWithId } from "../../../common/types/eventTypes.ts";
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

    return onValue(eventsRef, (snapshot) => {
      const data = snapshot.val(); // TODO: find out what is data - 1 or many events

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
      const snapshot = await get(ref(this.db, "/events"));
      request.success();

      return snapshot.val();
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };
}
