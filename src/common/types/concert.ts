export interface ConcertData {
  band: string;
  city: string;
  url: string;
  eventType: string;
  year?: number;
};

export type ConcertFormattedData = ConcertData & {
  id: string;
};

export interface ConcertRawData {
  [key: string]: ConcertData;
};
