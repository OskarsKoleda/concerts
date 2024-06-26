export interface ConcertData {
  band: string;
  city: string;
  year?: number;
  url: string;
};

export type ConcertFormattedData = ConcertData & {
  id: string;
};

export interface ConcertRawData {
  [key: string]: ConcertData;
};
