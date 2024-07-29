import type { RequestErrorMessages } from "../rootTransport/types";

export enum ConcertRequests {
  getConcertsData = "getConcertsData",
  getConcert = "getConcert",
  addConcert = "addConcert",
  deleteConcert = "deleteConcert",
  updateConcert = "updatecConcert",
}

export const requestErrorMessages: RequestErrorMessages<ConcertRequests> = {
  [ConcertRequests.getConcertsData]: {
    incorrectResponse: "Incorrect concerts data was received",
    unexpectedError: "Unable to retrieve concerts data",
  },
  [ConcertRequests.getConcert]: {
    incorrectResponse: "Incorrect concert data was received",
    unexpectedError: "Unable to retrieve a concert data",
  },
  [ConcertRequests.addConcert]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to add a concert",
  },
  [ConcertRequests.deleteConcert]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to delete a concert",
  },
  [ConcertRequests.updateConcert]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to update a concert",
  },
};
