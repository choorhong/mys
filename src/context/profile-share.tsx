import React, { createContext, FC, useEffect, useReducer } from "react";

type ProfileShareContextType = {
  balance: number;
  sharesOwned?: Record<string, any>;
};

export const ProfileShareContext = createContext<ProfileShareContextType>(
  {} as ProfileShareContextType
);

type ActionType = {
  type: "INITIAL" | "PURCHASE" | "SELL";
  response: Record<string, any>;
};
const reducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case "INITIAL":
      return { ...state, sharesOwned: action.response };
    default:
      return state;
  }
};

const initialState = { sharesOwned: {}, balance: 1_000_000 };
type StateType = typeof initialState;

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

  return (
    <ProfileShareContext.Provider
      value={{ sharesOwned: state.sharesOwned, balance: state.balance }}
    >
      {props.children}
    </ProfileShareContext.Provider>
  );
};

export default ProfileShareContextProvider;
