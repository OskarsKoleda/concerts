import type { ServerEventData } from "../common/types/eventTypes.ts";

export type EventCreateResponse = { eventReference: string | null } | { message: string };

export type EventReadResponse = { event: ServerEventData } | { message: string };

export type EventUpdateResponse = { eventId: string } | { message: string };

export type EventDeleteResponse = { success: boolean } | { message: string };

export type ImageUploadResponse =
  | {
      publicId: string;
      posterImageUrl: string;
    }
  | { message: string };
