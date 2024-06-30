import { RequestErrorMessages } from "../rootTransport/types";

export enum ConcertRequests {
  getConcertData = "getConcertData",
  addConcert = "addConcert",
  deleteConcert = "deleteConcert",
}

export const requestErrorMessages: RequestErrorMessages<ConcertRequests> = {
  [ConcertRequests.getConcertData]: {
    incorrectResponse: "Incorrect concert data was received",
    unexpectedError: "Unable to retrieve concert data",
  },
  [ConcertRequests.addConcert]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to add a concert",
  },
  [ConcertRequests.deleteConcert]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to delete a concert",
  },
};
