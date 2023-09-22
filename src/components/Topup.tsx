import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useContext, useMemo, useRef, useState } from "react";
import { ProfileShareContext } from "../context/profile-share";
import { formatNumberToLocaleString } from "../utils";
import { useParams, useSearchParams } from "react-router-dom";
import { ShareDataType } from "../interfaces";

type PropType = {
  children?: React.ReactNode;
  items?: ShareDataType;
  onHandleNextStep: (
    obj: { purchase: boolean; costOfTransaction: number } | string
  ) => void;
};

const Topup = (props: PropType) => {
  const { onHandleNextStep } = props;
  const [error, setError] = useState<string>();
  const inputRef = useRef<string>();

  const profileShareContext = useContext(ProfileShareContext);
  const { balance, handleTransaction } = profileShareContext;

  const [params] = useSearchParams();
  const costOfTransaction = params.get("costOfTransaction");

  const { ticker = "" } = useParams();

  const handleClick = () => {
    if (!inputRef.current) {
      setError("Required");
    }

    // update balance in context
    handleTransaction({
      action: "TOPUP",
      response: {
        unit: 1,
        totalCostOfTransaction: +inputRef.current!,
        ticker,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    inputRef.current = e.target.value;
  };

  const handleBack = () => {
    onHandleNextStep("back");
  };

  const handleNextStep = () => {
    if (!costOfTransaction) return;
    onHandleNextStep({ purchase: true, costOfTransaction: +costOfTransaction });
  };

  const reloadAmount = useMemo(() => {
    if (!costOfTransaction) return 0;
    if (balance - Number(costOfTransaction) > 0) return 0;
    return Math.abs(balance - Number(costOfTransaction));
  }, [balance, costOfTransaction]);

  return (
    <div className="general-container">
      <div className="checkout-item-wrapper">
        <p className="checkout-label"> Minimum reload amount required:</p>
        <p className="checkout-value">
          {formatNumberToLocaleString(reloadAmount)}
        </p>
      </div>

      <TextField
        label="Reload Amount"
        className="form-input"
        onChange={handleChange}
        error={!!error}
        helperText={error}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClick}>
                <AddCircleOutlineOutlined />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="checkout-item-wrapper" style={{ marginTop: "0.5rem" }}>
        <p className="checkout-label">Current Account Balance:</p>
        <p className="checkout-value">{balance.toLocaleString()}</p>
      </div>

      {balance - Number(costOfTransaction) > 0 ? (
        <div style={{ margin: "0.5rem 0" }} onClick={handleNextStep}>
          <Button type="submit" variant="contained">
            Check out
          </Button>
        </div>
      ) : null}
      <div style={{ margin: "0.5rem 0" }}>
        <Button type="submit" variant="outlined" onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Topup;
