import { ItemType, ShareOwnedType } from "../interfaces";

export const isTodayBetweenYesterdayAndTomorrow = (args: {
  today: string;
  prev?: string;
  next?: string;
}) => {
  const { today, prev, next } = args;

  if (!prev || !next) return false;

  return today >= prev && today <= next;
};

export const retrieveData = (item: ItemType) => {
  // Format today's date as 'YYYY-MM-DD'
  const dateString = new Date().toISOString().split("T")[0];

  // const today = new Date(); // Get the current date
  // const yesterday = new Date();
  // yesterday.setDate(today.getDate() + 50);

  // const dateString = yesterday.toISOString().split("T")[0];

  return item.data.find((i, index) => {
    const prevDate = item.data[index - 1]?.timestamp;
    const nextDate = item.data[index + 1]?.timestamp;

    return (
      i.timestamp === dateString ||
      isTodayBetweenYesterdayAndTomorrow({
        today: dateString,
        prev: prevDate,
        next: nextDate,
      }) ||
      dateString >= i.timestamp
    );
  });
};

export const calculateUserProfileInvestment = (item: ShareOwnedType) => {
  const { transactionHistory } = item;
  let sharesOwned;
  if (!transactionHistory || !transactionHistory.length) {
    sharesOwned = { totalSharesOwned: 0, avgCost: 0 };
  } else {
    const reveredTransactionHistory = transactionHistory.reverse();

    sharesOwned = reveredTransactionHistory.reduce(
      (acc, transaction) => {
        if (transaction.purchased) {
          acc.totalSharesOwned += transaction.noOfShare;
          acc.avgCost =
            (acc.avgCost * (acc.totalSharesOwned - transaction.noOfShare) +
              transaction.noOfShare * transaction.cost) /
            acc.totalSharesOwned;
        } else {
          acc.totalSharesOwned -= transaction.noOfShare;
          if (acc.totalSharesOwned > 0) {
            acc.avgCost =
              (acc.avgCost * (acc.totalSharesOwned + transaction.noOfShare) -
                transaction.noOfShare * transaction.cost) /
              acc.totalSharesOwned;
          } else {
            acc.avgCost = 0;
          }
        }
        return acc;
      },
      { totalSharesOwned: 0, avgCost: 0 }
    );
  }

  return {
    [item.ticker]: {
      name: item.name,
      ticker: item.ticker,
      sharesOwned,
    },
  };
};
