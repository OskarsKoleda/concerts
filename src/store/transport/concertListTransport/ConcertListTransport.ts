import type { Database } from "firebase/database";
import { onValue, ref } from "firebase/database";
import { makeAutoObservable } from "mobx";

import { appendEventIdToServerEvent } from "../../../common/utils/utility";
import { getRequestContext } from "../rootTransport/utils";

import type { ServerEventData, ServerEventDataWithId } from "../../../common/types/eventTypes.ts";
import type { RequestHandler } from "../requestHandler/RequestHandler";
import type { ChildTransport, RequestContext } from "../rootTransport/types";
import { ConcertListRequests, requestErrorMessages } from "./constants";

// why need to implement ChildTransport?
export class ConcertListTransport implements ChildTransport {
  constructor(
    readonly db: Database,
    readonly requestHandler: RequestHandler,
  ) {
    makeAutoObservable(this);
  }

  private getRequestContextHelper = (requestName: ConcertListRequests): RequestContext => {
    return getRequestContext(requestName, this.requestHandler, requestErrorMessages);
  };

  concertsListener = (callback: (concerts: ServerEventDataWithId[]) => void) => {
    const concertsRef = ref(this.db, "/events");
    onValue(concertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedConcerts: ServerEventDataWithId[] = appendEventIdToServerEvent(data);
        callback(formattedConcerts);
      } else {
        callback([]);
      }
    });
  };

  fetchEvents = async (): Promise<ServerEventData | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(
      ConcertListRequests.getConcertsData,
    );

    try {
      request.inProgress();
      const concertsRef = ref(this.db, "/events");

      return new Promise((res) => {
        onValue(concertsRef, (snapshot) => {
          const data: ServerEventData = snapshot.val();
          request.success();
          res(data);
        });
      });
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };
}
