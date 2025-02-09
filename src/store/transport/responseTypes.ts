import type { ServerEventData } from "../../common/types/eventTypes.ts";

export type EventCreateResult = { eventReference: string | null } | { message: string }; // TODO: | null
export type EventReadResult = { event: ServerEventData } | { message: string };
export type EventUpdateResult = { eventReference: string } | { message: string };
export type EventDeleteResult = { success: boolean } | { message: string };
export type ImageUploadResult =
  | {
      publicPosterImageId: string;
      posterImageUrl: string;
    }
  | { message: string };
