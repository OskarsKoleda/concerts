import type { RequestErrorMessages } from "../rootTransport/types.ts";

export enum UserRequests {
  createUser = "createUser",
  getUser = "getUser",
}

export const requestErrorMessages: RequestErrorMessages<UserRequests> = {
  [UserRequests.createUser]: {
    incorrectResponse: "Wrong ...",
    unexpectedError: "Unable to create a user",
  },
  [UserRequests.getUser]: {
    incorrectResponse: "Wrong ...",
    unexpectedError: "Unable to get a user",
  },
};
