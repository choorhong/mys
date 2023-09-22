import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ShareDataType, ShareInfoType } from "../interfaces";

import { Grid, Paper, Typography } from "@mui/material";
import "../App.css";
import { formatNumberToLocaleString } from "../utils";
import { ProfileShareContext } from "../context/profile-share";

type PropsType = {
  children?: React.ReactNode;
  item: ShareInfoType;
};

const ShareInfo = (props: PropsType) => {
  const navigate = useNavigate();
  const { item } = props;
  const { data = {} as ShareDataType } = item;
  const { high, low, previousDayClose } = data;

  const profileShareContext = useContext(ProfileShareContext);

  const totalSharesOwned =
    profileShareContext?.sharesOwned?.[item.ticker]?.sharesOwned
      ?.totalSharesOwned;

  const indices = useMemo(() => {
    if (!high || !low)
      return {
        avgPrice: "-",
        isHigherThanPreviousDayClose: true,
      };
    const avgP = (high + low) / 2;

    const isHigherThanPreviousDayClose = avgP - previousDayClose >= 0;
    return {
      avgPrice: formatNumberToLocaleString(avgP),
      isHigherThanPreviousDayClose,
    };
  }, [high, low, previousDayClose]);

  const handleClick = (route: string) => {
    const encodedUrl = encodeURIComponent(route);
    navigate(`/${encodedUrl}`);
  };

  const subTitle = useMemo(() => {
    if (totalSharesOwned) {
      return `${totalSharesOwned} shares | ${item.name}`;
    }

    return item.name;
  }, [totalSharesOwned, item.name]);

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
            <div className="share-ticker share-company">{subTitle}</div>
          </div>
          <div className="share-price-wrapper">
            <div
              className={`share-price ${
                indices.isHigherThanPreviousDayClose
                  ? "share-price-high"
                  : "share-price-low"
              }`}
            >
              {indices.avgPrice}
            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default ShareInfo;
