import type { RequestErrorMessages } from "../rootTransport/types.ts";

export enum FirebaseAuthRequests {
  login = "login",
  signUp = "signUp",
  logout = "logout",
  deleteUser = "deleteUser",
}

export const requestErrorMessages: RequestErrorMessages<FirebaseAuthRequests> = {
  [FirebaseAuthRequests.login]: {
    incorrectResponse: "Wrong...",
    unexpectedError: "Unable to login",
  },
  [FirebaseAuthRequests.signUp]: {
    incorrectResponse: "Wrong...",
    unexpectedError: "Unable to signup",
  },
  [FirebaseAuthRequests.logout]: {
    incorrectResponse: "Wrong...",
    unexpectedError: "Unable to logout",
  },
  [FirebaseAuthRequests.deleteUser]: {
    incorrectResponse: "Wrong...",
    unexpectedError: "Unable to complete registration (user deletion failed)",
  },
};
