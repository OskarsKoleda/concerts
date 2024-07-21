export interface ConcertData {
  eventType: string;
  title: string;
  bands: string[];
  city: string;
  date: string;
  endDate?: string;
  ticketPrice: number;
  posterUrl: string;
};

export type ConcertFormattedData = ConcertData & {
  id: string;
};

export interface ConcertRawData {
  [key: string]: ConcertData;
};
