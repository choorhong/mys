import { Button } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { ProfileShareContext } from "../context/profile-share";
import { useContext, useMemo } from "react";
import "../App.css";
import { ShareDataType } from "../interfaces";
import { capitalizeFirstLetter, formatNumberToLocaleString } from "../utils";

type PropType = {
  children?: React.ReactNode;
  items?: ShareDataType;
  onHandleNextStep: (obj: string) => void;
};

const Checkout = (props: PropType) => {
  const { onHandleNextStep, items = {} as ShareDataType } = props;
  const { high, low } = items;

  const [params] = useSearchParams();
  const tradeType = params.get("tradeType");
  const unit = params.get("unit");
  const costOfTransaction = params.get("costOfTransaction");

  const profileShareContext = useContext(ProfileShareContext);
  const { balance } = profileShareContext;

  console.log("profileShareContext", profileShareContext);

  const { ticker = "" } = useParams();
  const averageCostOfOwnedShare =
    profileShareContext?.sharesOwned?.[ticker]?.sharesOwned?.avgCost;

  const costOfShare = (low + high) / 2;

  const potentialEarning = useMemo(() => {
    let pe = 0;
    if (tradeType === "sell") {
      pe = averageCostOfOwnedShare - costOfShare;
    }

    if (pe > 0 && unit) {
      return {
        totalPotentialEarning: pe * +unit,
        potentialEarningPerShare: pe,
      };
    }

    return false;
  }, [averageCostOfOwnedShare, costOfShare, tradeType, unit]);

  const handleBack = () => {
    onHandleNextStep("back");
  };

  const handleExecuteTrade = () => {};

  return (
    <div style={{ margin: "0.5rem" }}>
      <div style={{ width: "50%" }}>
        <p className="checkout-label">Trade Type</p>
        <p className="checkout-value">{capitalizeFirstLetter(tradeType)}</p>
      </div>
      <div style={{ width: "50%" }}>
        <p className="checkout-label">Unit</p>
        <p className="checkout-value">{unit}</p>
      </div>
      <div style={{ width: "50%" }}>
        <p className="checkout-label">
          {tradeType === "purchase" ? "Cost of Purchase" : "Cost of Sales"}
        </p>
        <p className="checkout-value">
          {costOfTransaction && formatNumberToLocaleString(costOfTransaction)}
        </p>
      </div>
      <div style={{ width: "50%" }}>
        <p className="checkout-label">Current Account Balance</p>
        <p className="checkout-value">{balance.toLocaleString()}</p>
      </div>

      {potentialEarning ? (
        <div style={{ width: "50%" }}>
          <p className="checkout-label">Potential Earning</p>
          <p className="checkout-value">
            {`${formatNumberToLocaleString(
              potentialEarning.totalPotentialEarning
            )} 
            (${formatNumberToLocaleString(
              potentialEarning.potentialEarningPerShare
            )}
            / share)`}
          </p>
        </div>
      ) : null}

      {/* <pre>{JSON.stringify({ tradeType, unit }, null, 2)}</pre> */}
      <div style={{ margin: "0.5rem 0" }}>
        <Button variant="contained" onClick={handleExecuteTrade}>
          Execute Trade
        </Button>
      </div>
      <div style={{ margin: "2rem 0" }}>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
