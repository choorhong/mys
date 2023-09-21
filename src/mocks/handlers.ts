import { rest } from "msw";
import { findFirst, findTickerData, retrieveUserProfile } from "./utils";

import {
  item as APPLE_DATA,
  shareOwned as APPLE_SHARE_OWNED,
} from "./data/apple.ts";
import { item as IBM_DATA, shareOwned as IBM_SHARE_OWNED } from "./data/ibm.ts";
import { ItemType, ShareOwnedType } from "./interfaces.ts";

const COMBINED_DATA = [APPLE_DATA, IBM_DATA] as ItemType[];

const data = {
  COMBINED: COMBINED_DATA,
  AAPL: APPLE_DATA,
  IBM: IBM_DATA,
};

const sharesOwned = [APPLE_SHARE_OWNED, IBM_SHARE_OWNED] as ShareOwnedType[];

type DataType = typeof data;
type StrictItemType = Omit<DataType, "COMBINED">;
type StrictItemKeyType = keyof StrictItemType;

export const handlers = [
  rest.get("http://localhost:8080/carpark-search", async (_req, res, ctx) => {
    const result = findFirst(data.COMBINED);
    return res(ctx.status(200), ctx.json({ result }));
  }),
  rest.get(
    "http://localhost:8080/user-investment-portfolio",
    async (_req, res, ctx) => {
      const result = retrieveUserProfile(sharesOwned);
      return res(ctx.status(200), ctx.json({ result }));
    }
  ),
  rest.get("http://localhost:8080/:ticker", async (req, res, ctx) => {
    const { ticker } = req.params;
    const t = (ticker as string).toUpperCase() as StrictItemKeyType;
    const result = findTickerData(data[t]);
    return res(ctx.status(200), ctx.json({ result }));
  }),
];
