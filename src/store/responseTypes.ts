import type { Nullable } from "../common/types/appTypes.ts";

export type FirebaseResponse = Nullable<string> | undefined;

export type ImageUploadData = {
  posterImageTitle: string;
  posterImageUrl: string;
};
