import { onValue, ref, set, push, remove, get, child, update } from "firebase/database";
import { makeAutoObservable } from "mobx";

import { getRequestContext } from "../rootTransport/utils";

import { ConcertRequests, requestErrorMessages } from "./constants";

import type { Database } from "firebase/database";
import type { ConcertData, ConcertRawData } from "../../../common/types/concert";
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

  getConcert = async (id: string) => {
    const dbRef = ref(this.db);
    const { errorTexts, request } = this.getRequestContextHelper(ConcertRequests.getConcert);

    try {
      request.inProgress();
      const result = await get(child(dbRef, `/concerts/${id}`));
      if (result.exists()) {
        return result.val();
      } else {
        throw new Error("No data available");
      }
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };

  updateConcert = async (concert: ConcertData, id: string) => {
    const { errorTexts, request } = this.getRequestContextHelper(ConcertRequests.updateConcert);
    const updatedConcert = {
      ...concert,
      endDate: concert.endDate || null,
    };

    try {
      request.inProgress();
      const concertRef = ref(this.db, `/concerts/${id}`);
      await update(concertRef, updatedConcert);
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };

  deleteConcert = async (id: string): Promise<void> => {
    const { errorTexts, request } = this.getRequestContextHelper(ConcertRequests.deleteConcert);

    try {
      request.inProgress();
      const concertRef = ref(this.db, `/concerts/${id}`);
      await remove(concertRef);
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };
}
