import { Grid } from "@mui/material";
import "../App.css";

type PropsType = {
  children?: React.ReactNode;
  items?: any;
};

const Position = (props: PropsType) => {
  const { items = {} } = props;
  const { sharesOwned } = items;

  console.log("item", items);

  return (
    <fieldset>
      <legend>YOUR POSITION</legend>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Units</div>
          <div className="share-ticker share-company">
            {sharesOwned?.totalSharesOwned?.toFixed(2)}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="share-ticker share-company">Average Cost</div>
          <div className="share-ticker share-company">
            {sharesOwned?.avgCost?.toFixed(2)}
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
