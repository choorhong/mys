export type ShareDataType = {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type ShareInfoType = {
  name: string;
  ticker: string;
  data?: ShareDataType;
};
