export type ConcertData = {
  band: string;
  city: string;
  year?: number;
  url: string;
};

export type ConcertFormattedData = ConcertData & {
  id: string;
};

export type ConcertRawData = {
  [key: string]: ConcertData;
};
