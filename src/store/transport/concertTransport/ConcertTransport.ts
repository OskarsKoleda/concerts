import { onValue, ref, set, push, remove, get, child, update } from "firebase/database";
import { makeAutoObservable } from "mobx";

import { getRequestContext } from "../rootTransport/utils";
import { transformFirebaseObject } from "../../../common/utils/utility";
import { ResponseMessages } from "../../../common/constants/appConstant";

import { ConcertRequests, requestErrorMessages, ResponseStatuses } from "./constants";

import type { FirebaseResponse } from "../../types";
import type { Database } from "firebase/database";
import type {
  ConcertData,
  ConcertFormattedData,
  ConcertRawData,
} from "../../../common/types/concert";
import type { RequestHandler } from "../requestHandler/RequestHandler";
import type { ChildTransport, RequestContext } from "../rootTransport/types";

// why need to implement ChildTransport?
export class ConcertTransport implements ChildTransport {
  constructor(readonly db: Database, readonly requestHandler: RequestHandler) {
    makeAutoObservable(this);
  }

  private getRequestContextHelper = (requestName: ConcertRequests): RequestContext => {
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

  fetchConcertsData = async (): Promise<ConcertRawData | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(ConcertRequests.getConcertsData);

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

  addConcert = async (concert: ConcertData) => {
    const { errorTexts, request } = this.getRequestContextHelper(ConcertRequests.addConcert);
    const newConcert = {
      ...concert,
      startDate: concert.startDate.toISOString(),
      endDate: concert.endDate ? concert.endDate.toISOString() : null,
    };

    try {
      request.inProgress();
      const newConcertRef = push(ref(this.db, `/concerts`));
      await set(newConcertRef, newConcert);
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };

  getConcert = async (id: string): Promise<FirebaseResponse> => {
    const dbRef = ref(this.db);
    const { errorTexts, request } = this.getRequestContextHelper(ConcertRequests.getConcert);

    try {
      request.inProgress();
      const result = await get(child(dbRef, `/concerts/${id}`));
      if (result.exists()) {
        return {
          status: ResponseStatuses.ERROR,
          message: ResponseMessages.CONCERT_NOT_FOUND,
          concert: result.val(),
        };
      } else {
        return { status: ResponseStatuses.ERROR, message: ResponseMessages.CONCERT_NOT_FOUND };
      }
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);

      return {
        status: ResponseStatuses.ERROR,
        message: ResponseMessages.CONCERT_RETRIEVE_FAILED,
      };
    }
  };

  updateConcert = async (concert: ConcertData, id: string): Promise<FirebaseResponse> => {
    const { errorTexts, request } = this.getRequestContextHelper(ConcertRequests.updateConcert);
    const updatedConcert = {
      ...concert,
      endDate: concert.endDate || null,
    };

    try {
      request.inProgress();
      const concertRef = ref(this.db, `/concerts/${id}`);
      await update(concertRef, updatedConcert);
      request.success();

      return { status: ResponseStatuses.OK, message: ResponseMessages.CONCERT_SUCCESSFUL_UPDATE };
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);

      return { status: ResponseStatuses.ERROR, message: ResponseMessages.CONCERT_UPDATE_FAILURE };
    }
  };

  deleteConcert = async (id: string): Promise<FirebaseResponse> => {
    const { errorTexts, request } = this.getRequestContextHelper(ConcertRequests.deleteConcert);
    const concertRef = ref(this.db, `/concerts/${id}`);

    request.inProgress();

    try {
      request.inProgress();
      await remove(concertRef);
      request.success();

      return { status: ResponseStatuses.OK, message: ResponseMessages.CONCERT_SUCCESSFUL_DELETION };
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);

      return { status: ResponseStatuses.ERROR, message: ResponseMessages.CONCERT_DELETION_FAILURE };
    }
  };
}
