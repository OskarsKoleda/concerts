import { onValue, ref } from "firebase/database";
import { makeAutoObservable } from "mobx";

import { transformFirebaseObject } from "../../../common/utils/utility";
import { getRequestContext } from "../rootTransport/utils";

import { ConcertListRequests, requestErrorMessages } from "./constants";

import type { Database } from "firebase/database";
import type { ConcertFormattedData, ConcertRawData } from "../../../common/types/concert";
import type { RequestHandler } from "../requestHandler/RequestHandler";
import type { ChildTransport, RequestContext } from "../rootTransport/types";

// why need to implement ChildTransport?
export class ConcertListTransport implements ChildTransport {
  constructor(readonly db: Database, readonly requestHandler: RequestHandler) {
    makeAutoObservable(this);
  }

  private getRequestContextHelper = (requestName: ConcertListRequests): RequestContext => {
    return getRequestContext(requestName, this.requestHandler, requestErrorMessages);
  };

  concertsListener = (callback: (concerts: ConcertFormattedData[]) => void) => {
    const concertsRef = ref(this.db, "/concerts");
    onValue(concertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedConcerts: ConcertFormattedData[] = transformFirebaseObject(data);
        callback(formattedConcerts);
      } else {
        callback([]);
      }
    });
  };

  fetchConcerts = async (): Promise<ConcertRawData | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(
      ConcertListRequests.getConcertsData,
    );

    try {
      request.inProgress();
      const concertsRef = ref(this.db, "/concerts");

      return new Promise((res) => {
        onValue(concertsRef, (snapshot) => {
          const data: ConcertRawData = snapshot.val();
          request.success();
          res(data);
        });
      });
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };
}
