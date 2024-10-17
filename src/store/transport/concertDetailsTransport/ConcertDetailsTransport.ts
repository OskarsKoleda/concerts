import { child, get, push, ref, remove, set, update, type Database } from "firebase/database";
import { makeAutoObservable } from "mobx";

import { ResponseMessages } from "../../../common/constants/appConstant";
import { getRequestContext } from "../rootTransport/utils";

import { ConcertDetailsRequests, requestErrorMessages, ResponseStatuses } from "./constants";

import type { ConcertData } from "../../../common/types/concert";
import type { FirebaseResponse } from "../../types";
import type { RequestHandler } from "../requestHandler/RequestHandler";
import type { ChildTransport, RequestContext } from "../rootTransport/types";

export class ConcertDetailsTransport implements ChildTransport {
  constructor(readonly db: Database, readonly requestHandler: RequestHandler) {
    makeAutoObservable(this);
  }

  private getRequestContextHelper = (requestName: ConcertDetailsRequests): RequestContext => {
    return getRequestContext(requestName, this.requestHandler, requestErrorMessages);
  };

  addConcert = async (concert: ConcertData) => {
    const { errorTexts, request } = this.getRequestContextHelper(ConcertDetailsRequests.addConcert);
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
    const { errorTexts, request } = this.getRequestContextHelper(ConcertDetailsRequests.getConcert);

    try {
      request.inProgress();
      const result = await get(child(dbRef, `/concerts/${id}`));
      if (result.exists()) {
        request.success();

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
    const { errorTexts, request } = this.getRequestContextHelper(
      ConcertDetailsRequests.updateConcert,
    );
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
    const { errorTexts, request } = this.getRequestContextHelper(
      ConcertDetailsRequests.deleteConcert,
    );
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
