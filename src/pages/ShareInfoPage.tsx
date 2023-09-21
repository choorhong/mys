import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../App.css";
import { ShareInfoType } from "../interfaces";
import { ProfileShareContext } from "../context/profile-share";
import ShareStat from "../components/ShareStat";
import Position from "../components/Position";
import TradeButton from "../components/TradeButton";

const ShareInfoPage = () => {
  const { ticker } = useParams();
  const profileShareContext = useContext(ProfileShareContext);
  const [state, setState] = useState<{ result: ShareInfoType | undefined }>();

  const { sharesOwned } = profileShareContext;

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/${ticker}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseBody = await response.json();

      setState(responseBody);
    })();
  }, [ticker]);

  return (
    <div style={{ padding: "0 0.5rem " }}>
      <div className="share-ticker">
        {state?.result?.name} ({state?.result?.ticker})
      </div>

      <ShareStat items={state?.result?.data} />

      {ticker && sharesOwned?.[ticker] ? (
        <Position items={sharesOwned[ticker]} />
      ) : null}

      <TradeButton />
    </div>
  );
};

export default ShareInfoPage;
