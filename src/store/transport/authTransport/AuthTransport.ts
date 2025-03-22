import type { UserCredential } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { RequestHandler } from "../requestHandler/RequestHandler.ts";
import type { ChildTransport, RequestContext } from "../rootTransport/types.ts";
import { getRequestContext } from "../rootTransport/utils.ts";
import type { AuthUserProfile } from "../../../common/types/eventTypes.ts";
import { auth } from "../../../firebaseConfig.ts";
import { FirebaseAuthRequests, requestErrorMessages } from "./constants.ts";

export class AuthTransport implements ChildTransport {
  constructor(readonly requestHandler: RequestHandler) {}

  private getRequestContextHelper = (requestName: FirebaseAuthRequests): RequestContext => {
    return getRequestContext(requestName, this.requestHandler, requestErrorMessages);
  };

  signUp = async (user: AuthUserProfile): Promise<UserCredential | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(FirebaseAuthRequests.signUp);
    const { email, password } = user;

    try {
      request.inProgress();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      request.success();

      return userCredential;
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
      throw error;
    }
  };

  login = async (user: AuthUserProfile): Promise<UserCredential | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(FirebaseAuthRequests.login);
    const { email, password } = user;

    try {
      request.inProgress();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      request.success();

      return userCredential;
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
      throw error;
    }
  };

  logout = async () => {
    const { errorTexts, request } = this.getRequestContextHelper(FirebaseAuthRequests.logout);

    try {
      request.inProgress();

      await auth.signOut();

      request.success();
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
      throw error;
    }
  };

  deleteUser = async () => {
    const user = auth.currentUser;

    if (user) {
      await deleteUser(user);
    }
  };
}
