import { ConcertFormattedData, ConcertRawData } from "../types/concert";

export function transformFirebaseObject(concerts: ConcertRawData): ConcertFormattedData[] {
  return Object.keys(concerts).map((key) => ({
    ...concerts[key],
    id: key,
  }));
}
