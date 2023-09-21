import { Grid } from "@mui/material";
import "../App.css";
import { ShareDataType } from "../interfaces";

type PropsType = {
  children?: React.ReactNode;
  items?: ShareDataType;
};

const ShareStat = (props: PropsType) => {
  const { items = {} as ShareDataType } = props;
  const { open, close, high, low, volume } = items;

  return (
    <fieldset>
      <legend>STATS</legend>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Open</div>
          <div className="share-ticker share-company">{open?.toFixed(2)}</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Close</div>
          <div className="share-ticker share-company">{close?.toFixed(2)}</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">High</div>
          <div className="share-ticker share-company">{high?.toFixed(2)}</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Low</div>
          <div className="share-ticker share-company">{low?.toFixed(2)}</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Volume</div>
          <div className="share-ticker share-company">
            {volume?.toLocaleString()}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Market Cap (HC)</div>
          <div className="share-ticker share-company">132.91B</div>
        </Grid>
      </Grid>

      {/* <pre style={{ textWrap: "wrap" }}>{JSON.stringify(state, null, 2)}</pre> */}
    </fieldset>
  );
};

export default ShareStat;
