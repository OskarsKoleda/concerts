import type { RequestErrorMessages } from "../rootTransport/types";

export enum ConcertListRequests {
  getConcertsData = "getConcertsData",
}

export const requestErrorMessages: RequestErrorMessages<ConcertListRequests> = {
  [ConcertListRequests.getConcertsData]: {
    incorrectResponse: "Incorrect concerts data was received",
    unexpectedError: "Unable to retrieve concerts data",
  },
};

export enum ResponseStatuses {
  OK = "OK",
  ERROR = "ERROR",
}
