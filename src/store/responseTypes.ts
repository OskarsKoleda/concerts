import type { Nullable } from "../common/types/appTypes.ts";

export type FirebaseResponse = Nullable<string> | undefined;

export type ImageUploadData = {
  publicPosterImageId: string;
  posterImageUrl: string;
};
