import { item as APPLE_DATA } from "./data/apple.ts";
import { item as IBM_DATA, shareOwned } from "./data/ibm.ts";

export type ItemType = typeof IBM_DATA;

const data = [APPLE_DATA, IBM_DATA] as ItemType[];
export type DataType = typeof data;

export type ShareInfoType = {
  name: string;
  ticker: string;
  data?: (typeof IBM_DATA.data)[0];
};

export type TheransactionHistoryType =
  | (typeof shareOwned.transactionHistory)[0];

export type ShareOwnedType = {
  name: string;
  ticker: string;
  transactionHistory?: TheransactionHistoryType[];
};
