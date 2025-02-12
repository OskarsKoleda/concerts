import type { RequestErrorMessages } from "../rootTransport/types";

export enum EventDetailsRequests {
  getEvent = "getEvent",
  addEvent = "addEvent",
  deleteEvent = "deleteEvent",
  updateEvent = "updateEvent",
  uploadPoster = "uploadPoster",
}

export const requestErrorMessages: RequestErrorMessages<EventDetailsRequests> = {
  [EventDetailsRequests.getEvent]: {
    incorrectResponse: "Incorrect event data was received",
    unexpectedError: "Unable to retrieve an event data",
  },
  [EventDetailsRequests.addEvent]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to add an event",
  },
  [EventDetailsRequests.deleteEvent]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to delete an event",
  },
  [EventDetailsRequests.updateEvent]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Unable to update an event",
  },
  [EventDetailsRequests.uploadPoster]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Failed to upload event poster",
  },
};

export enum ResponseStatuses {
  OK = "OK",
  ERROR = "ERROR",
}
