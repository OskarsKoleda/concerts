import { RequestErrorMessages } from "../rootTransport/types";

export enum ConcertRequests {
  getConcertData = "getConcertData",
}

export const requestErrorMessages: RequestErrorMessages<ConcertRequests> = {
  [ConcertRequests.getConcertData]: {
    incorrectResponse: "Incorrect concert data was received",
    unexpectedError: "Unable to retrieve concert data",
  },
};
