import { DataType, ItemType, ShareOwnedType } from "../interfaces";
import { calculateUserProfileInvestment, retrieveData } from "./helpers";

export const findFirst = (items: DataType) => {
  return items.map((item) => {
    const data = retrieveData(item);
    return {
      name: item.name,
      ticker: item.ticker,
      data: data,
    };
  });
};

export const retrieveUserProfile = (items: ShareOwnedType[]) => {
  let result = {};
  items.forEach((item) => {
    const calculatedResult = calculateUserProfileInvestment(item);
    result = { ...result, ...calculatedResult };
  });
  return result;
};

export const findTickerData = (item: ItemType) => {
  const data = retrieveData(item);
  return {
    name: item.name,
    ticker: item.ticker,
    data: data,
  };
};
