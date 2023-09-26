import { Grid } from "@mui/material";
import "../App.css";
import { formatNumberToLocaleString } from "../utils";
import { useMemo } from "react";

type PropsType = {
  children?: React.ReactNode;
  items?: any;
  info?: any;
};

const Position = (props: PropsType) => {
  const { items = {}, info = {} } = props;
  const { sharesOwned = {} } = items;
  const { totalSharesOwned, avgCost } = sharesOwned;

  const { close, open, high, low } = info;

  const marketValue = useMemo(() => {
    return totalSharesOwned * avgCost;
  }, [avgCost, totalSharesOwned]);

  const dayReturn = useMemo(() => {
    const dayReturn = close - open;
    const result = {
      return: dayReturn,
      returnPercentage: dayReturn / open,
    };
    return result;
  }, [close, open]);

  const totalReturn = useMemo(() => {
    const currentSharePrice = (high + low) / 2;
    const totalR = currentSharePrice - avgCost;
    const result = {
      return: totalR,
      returnPercentage: totalR / avgCost,
    };
    return result;
  }, [avgCost, high, low]);

  return (
    <fieldset>
      <legend>YOUR POSITION</legend>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Units</div>
          <div className="share-ticker share-company">
            {formatNumberToLocaleString(sharesOwned?.totalSharesOwned)}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Average Cost</div>
          <div className="share-ticker share-company">
            {formatNumberToLocaleString(sharesOwned?.avgCost)}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Market Value</div>
          <div className="share-ticker share-company">
            {formatNumberToLocaleString(marketValue)}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Today's return</div>
          <div className="share-ticker share-company">
            {`${formatNumberToLocaleString(
              dayReturn.return
            )} (${formatNumberToLocaleString(dayReturn.returnPercentage)}%)`}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Total return</div>
          <div className="share-ticker share-company">
            {`${formatNumberToLocaleString(
              totalReturn.return
            )} (${formatNumberToLocaleString(totalReturn.returnPercentage)}%)`}
          </div>
        </Grid>
      </Grid>

      {/* <pre style={{ textWrap: "wrap" }}>
          {JSON.stringify(sharesOwned, null, 2)}
        </pre> */}
    </fieldset>
  );
};

export default Position;
