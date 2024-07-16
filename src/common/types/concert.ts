export interface ConcertData {
  title: string;
  bands?: string[];
  city: string;
  posterUrl: string;
  eventType: string;
  year?: number;
  date: string;
};

export type ConcertFormattedData = ConcertData & {
  id: string;
};

export interface ConcertRawData {
  [key: string]: ConcertData;
};
