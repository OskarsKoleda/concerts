import { Database, onValue, ref, set, push, remove } from "firebase/database";
import { makeAutoObservable } from "mobx";
import { ConcertData, ConcertRawData } from "../../../common/types/concert";
import { RequestHandler } from "../requestHandler/RequestHandler";
import { ChildTransport, RequestContext } from "../rootTransport/types";
import { getRequestContext } from "../rootTransport/utils";
import { ConcertRequests, requestErrorMessages } from "./constants";

// why need to implement ChildTransport?
export class ConcertTransport implements ChildTransport {
  constructor(readonly db: Database, readonly requestHandler: RequestHandler) {
    makeAutoObservable(this);
  }

  private getRequestContextHelper = (requestName: ConcertRequests): RequestContext => {
    return getRequestContext(requestName, this.requestHandler, requestErrorMessages);
  };

  fetchConcertsData = async (): Promise<ConcertRawData | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(ConcertRequests.getConcertData);

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
    const newConcertRef = push(ref(this.db, `/concerts`));
    await set(newConcertRef, concert);
  };

  deleteConcert = async (id: string): Promise<void> => {
    const concertRef = ref(this.db, `/concerts/${id}`);
    await remove(concertRef);
  };
}
