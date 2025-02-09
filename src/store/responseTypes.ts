import type { ServerEventData } from "../common/types/eventTypes.ts";

export type EventUpdateStatus = { status: "OK" | "ERROR"; message: string };
export type EventRetrieveData = {
  status: "OK" | "ERROR";
  event?: ServerEventData;
  message: string;
};

export type EventUpdateData = {
  status: "OK" | "ERROR";
  eventReference?: string;
  message: string;
};

export type EventCreateData = {
  status: "OK" | "ERROR";
  eventReference?: string | null;
  message: string;
};

export type ImageUploadData = ImageUploadSuccess | ImageUploadError;

type ImageUploadSuccess = {
  status: "OK";
  publicPosterImageId: string;
  posterImageUrl: string;
};
type ImageUploadError = { status: "ERROR"; message: string };
