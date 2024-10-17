import type { RequestErrorMessages } from "../rootTransport/types";

export enum ConcertDetailsRequests {
  getConcert = "getConcert",
  addConcert = "addConcert",
  deleteConcert = "deleteConcert",
  updateConcert = "updatecConcert",
}

export const requestErrorMessages: RequestErrorMessages<ConcertDetailsRequests> = {
  [ConcertDetailsRequests.getConcert]: {
    incorrectResponse: "Incorrect concert data was received",
    unexpectedError: "Unable to retrieve a concert data",
  },
  [ConcertDetailsRequests.addConcert]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to add a concert",
  },
  [ConcertDetailsRequests.deleteConcert]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to delete a concert",
  },
  [ConcertDetailsRequests.updateConcert]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to update a concert",
  },
};

export enum ResponseStatuses {
  OK = "OK",
  ERROR = "ERROR",
}
