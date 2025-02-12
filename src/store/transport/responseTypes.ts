import type { ServerEventData } from "../../common/types/eventTypes.ts";
import type { Nullable } from "../../common/types/appTypes.ts";

// TODO: update or/and move
export type EventCreateResult = Nullable<string> | undefined;
export type EventUpdateResult = Nullable<string> | undefined;
export type EventReadResult = ServerEventData;
export type EventDeleteResult = Nullable<string> | undefined;
export type ImageUploadResult = {
  publicPosterImageId: string;
  posterImageUrl: string;
};
