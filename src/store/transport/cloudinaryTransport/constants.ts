import type { RequestErrorMessages } from "../rootTransport/types.ts";

export enum CloudinaryRequests {
  uploadPoster = "uploadPoster",
}

export const requestErrorMessages: RequestErrorMessages<CloudinaryRequests> = {
  [CloudinaryRequests.uploadPoster]: {
    incorrectResponse: "Incorrect...",
    unexpectedError: "Failed to upload event poster",
  },
};
