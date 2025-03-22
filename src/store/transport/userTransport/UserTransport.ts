import type { Database } from "firebase/database";
import { child, get, ref, set } from "firebase/database";
import type { RequestHandler } from "../requestHandler/RequestHandler.ts";
import type { ChildTransport, RequestContext } from "../rootTransport/types.ts";
import { getRequestContext } from "../rootTransport/utils.ts";
import type { LocalUserProfile } from "../../../common/types/eventTypes.ts";
import type { FirebaseResponse } from "../../responseTypes.ts";
import { requestErrorMessages, UserRequests } from "./constants.ts";

export class UserTransport implements ChildTransport {
  constructor(
    readonly db: Database,
    readonly requestHandler: RequestHandler,
  ) {}

  private getRequestContextHelper = (requestName: UserRequests): RequestContext => {
    return getRequestContext(requestName, this.requestHandler, requestErrorMessages);
  };

  createUser = async (user: LocalUserProfile): Promise<FirebaseResponse> => {
    const { errorTexts, request } = this.getRequestContextHelper(UserRequests.createUser);

    try {
      request.inProgress();
      const userRef = ref(this.db, `users/${user.uid}`);

      await set(userRef, user);
      request.success();

      return userRef.key;
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };

  getUser = async (uid: string) => {
    const { errorTexts, request } = this.getRequestContextHelper(UserRequests.getUser);

    try {
      request.inProgress();
      const userSnapshot = await get(child(ref(this.db), `/users/${uid}`));

      return userSnapshot.val();
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };
}
