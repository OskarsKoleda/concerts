import type { RequestErrorMessages } from "../rootTransport/types";

export enum EventListRequests {
  getEventsData = "getEventsData",
}

export const requestErrorMessages: RequestErrorMessages<EventListRequests> = {
  [EventListRequests.getEventsData]: {
    incorrectResponse: "Incorrect events data was received",
    unexpectedError: "Unable to retrieve events data",
  },
};

export enum ResponseStatuses {
  OK = "OK",
  ERROR = "ERROR",
}
