import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ShareInfo from "../components/ShareInfo";
import { ShareInfoType } from "../interfaces";
import ResponsiveAppBar from "../components/AppBar";

const SharesInfoPage = () => {
  const [state, setState] = useState<{ result: ShareInfoType[] | undefined }>();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8080/shares-search", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseBody = await response.json();

      setState(responseBody);
    })();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <div className="checkout-container">
        <Grid container spacing={2}>
          {state?.result
            ? state.result.map((item) => (
                <ShareInfo key={`${item.name}-${item.ticker}`} item={item} />
              ))
            : null}
        </Grid>
      </div>
    </>
  );
};

export default SharesInfoPage;
