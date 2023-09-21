import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ShareDataType, ShareInfoType } from "../interfaces";

import { Grid, Paper, Typography } from "@mui/material";
import "../App.css";

type PropsType = {
  children?: React.ReactNode;
  item: ShareInfoType;
};

const ShareInfo = (props: PropsType) => {
  const navigate = useNavigate();
  const { item } = props;
  const { data = {} as ShareDataType } = item;
  const { high, low } = data;
  const avgPrice = useMemo<number | string>(() => {
    if (!high || !low) return "-";
    return ((high + low) / 2).toFixed(2);
  }, [high, low]);

  const handleClick = (route: string) => {
    const encodedUrl = encodeURIComponent(route);
    navigate(`/${encodedUrl}`);
  };

  return (
    <Grid item xs={12} sm={6}>
      <Paper
        className="paper"
        onClick={() => {
          handleClick(item.ticker);
        }}
      >
        <div className="share-container">
          <div className="share-ticker-wrapper">
            <Typography className="share-ticker">{item.ticker}</Typography>
            <div className="share-ticker share-company">{item.name}</div>
          </div>
          <div className="share-price-wrapper">
            <div className="share-price">{avgPrice}</div>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default ShareInfo;
