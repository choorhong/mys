import React, { createContext, FC, useEffect, useReducer } from "react";

type ProfileShareContextType = {
  balance: number;
  sharesOwned?: Record<string, any>;
  handleTransaction: (obj: TransactionType) => void;
};

export const ProfileShareContext = createContext<ProfileShareContextType>(
  {} as ProfileShareContextType
);

type ActionType = {
  type: "INITIAL" | "PURCHASE" | "SELL";
  response: Record<string, any>;
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INITIAL":
      return { ...state, sharesOwned: action.response };
    case "PURCHASE": {
      let newTotalSharesOwned = 0;
      let newAvgCost = 0;
      const { ticker } = action.response;
      const isTickerExisted = state.sharesOwned[ticker];

      // Update existing share info by recalculate the share # and average cost
      if (isTickerExisted) {
        const {
          sharesOwned: { avgCost, totalSharesOwned },
        } = isTickerExisted;

        newTotalSharesOwned = totalSharesOwned + action.response.unit;
        newAvgCost =
          (avgCost * totalSharesOwned +
            action.response.totalCostOfTransaction) /
          newTotalSharesOwned;
      } else {
        // Add new info of the ticker
        newTotalSharesOwned = action.response.unit;
        newAvgCost =
          action.response.totalCostOfTransaction / newTotalSharesOwned;
      }

      const newState = {
        ...state,
        balance: state.balance - action.response.totalCostOfTransaction,
        sharesOwned: {
          ...state.sharesOwned,
          [ticker]: {
            ...state.sharesOwned[ticker],
            sharesOwned: {
              totalSharesOwned: newTotalSharesOwned,
              avgCost: newAvgCost,
            },
          },
        },
      };
      return newState;
    }

    case "SELL": {
      let newTotalSharesOwned = 0;
      let newAvgCost = 0;
      const { ticker } = action.response;
      const isTickerExisted = state.sharesOwned[ticker];

      const isAvailable =
        state.sharesOwned[ticker].sharesOwned.totalSharesOwned;
      // Error, can not sell non-preowned shares
      if (!isTickerExisted || !isAvailable) return { ...state };

      const {
        sharesOwned: { avgCost, totalSharesOwned },
      } = isTickerExisted;

      newTotalSharesOwned = totalSharesOwned - action.response.unit;
      newAvgCost =
        (avgCost * totalSharesOwned - action.response.totalCostOfTransaction) /
        newTotalSharesOwned;

      const newState = {
        ...state,
        balance: state.balance + action.response.totalCostOfTransaction,
        sharesOwned: {
          ...state.sharesOwned,
          [ticker]: {
            ...state.sharesOwned[ticker],
            sharesOwned: {
              totalSharesOwned:
                newTotalSharesOwned === 0 ? 0 : newTotalSharesOwned,
              avgCost: newTotalSharesOwned === 0 ? 0 : newAvgCost,
            },
          },
        },
      };

      return newState;
    }

    default:
      return state;
  }
};

const initialState = { sharesOwned: {}, balance: 1_000_000 };
type StateType = { sharesOwned: Record<string, any>; balance: number };

type TransactionType = {
  action: "PURCHASE" | "SELL" | "TOPUP";
  response: { totalCostOfTransaction: number; unit: number; ticker: string };
};

const ProfileShareContextProvider: FC<{ children: React.ReactNode }> = (
  props
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:8080/user-investment-portfolio",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseBody = await response.json();
      dispatch({ type: "INITIAL", response: responseBody.result });
    })();
  }, []);

  const handleTransaction = (obj: TransactionType) => {
    const { action, response } = obj;

    if (action === "PURCHASE") {
      // response = { totalCostOfTransaction: 22.22, unit: 1, ticker: 'IBM' }
      console.log("purchase??");
      dispatch({ type: "PURCHASE", response: response });
    }
    if (action === "SELL") {
      // response = { totalCostOfTransaction: 22.22, unit: 1, ticker: 'IBM' }
      dispatch({ type: "SELL", response: response });
    }
  };

  return (
    <ProfileShareContext.Provider
      value={{
        sharesOwned: state.sharesOwned,
        balance: state.balance,
        handleTransaction: handleTransaction,
      }}
    >
      {props.children}
    </ProfileShareContext.Provider>
  );
};

export default ProfileShareContextProvider;
