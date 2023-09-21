import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";

import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useContext, useState } from "react";
import { ProfileShareContext } from "../../context/profile-share";
import { useParams, useSearchParams } from "react-router-dom";
import { ShareDataType } from "../../interfaces";
import { formatNumberToLocaleString } from "../../utils";

import "../../App.css";

type PropType = {
  children?: React.ReactNode;
  items?: ShareDataType;

  onHandleNextStep: (obj: {
    purchase: boolean;
    costOfTransaction: number;
  }) => void;
};

const TradeForm = (props: PropType) => {
  const { onHandleNextStep, items = {} as ShareDataType } = props;
  const { high, low } = items;

  const [searchParams, setSearchParams] = useSearchParams();
  const tradeType = searchParams.get("tradeType") ?? "";
  const unit = searchParams.get("unit") ?? "";
  const costOfTransaction = searchParams.get("costOfTransaction") ?? 0;

  const costOfShare = (low + high) / 2;

  const profileShareContext = useContext(ProfileShareContext);
  const { balance } = profileShareContext;

  const { ticker = "" } = useParams();
  const totalSharesOwned =
    profileShareContext?.sharesOwned?.[ticker]?.sharesOwned?.totalSharesOwned;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    reValidateMode: "onBlur",
    defaultValues: {
      tradeType: tradeType,
      unit: unit,
    },
    resolver: yupResolver(
      yup.object({
        tradeType: yup.string().required("Required"),
        unit: yup
          .string()
          .required("Required")
          .test(
            "length",
            "Exceeded number of unit shares available to sell",
            function (value) {
              const { tradeType } = this.parent;
              if (
                tradeType === "purchase" ||
                (tradeType === "sell" && +value <= totalSharesOwned)
              ) {
                return true;
              }

              // will fail the validation
              return false;
            }
          ),
      })
    ),
  });

  const onSubmit = (values: any) => {
    const { tradeType, unit } = values;

    const transactionCost = +unit * costOfShare;
    onHandleNextStep({
      purchase: tradeType === "purchase",
      costOfTransaction: transactionCost,
    });

    setSearchParams(
      (prev) => {
        prev.set("tradeType", tradeType);
        prev.set("unit", unit);
        prev.set("costOfTransaction", transactionCost.toString());
        return prev;
      },
      { replace: true }
    );
  };

  const [trxCost, setTrxCost] = useState<number>(Number(costOfTransaction));
  const handleUnitChange = useCallback(
    (unitValue: string) => {
      let value = 0;
      if (unitValue === null || unitValue === undefined || +unitValue < 0) {
        return;
      }

      value = +unitValue * costOfShare;
      setTrxCost(value);
    },
    [costOfShare]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="tradeType"
        render={({ field }) => (
          <SelectInput
            errors={errors}
            field={field}
            label="Trade"
            totalSharesOwned={totalSharesOwned}
          />
        )}
      />
      <Controller
        control={control}
        name="unit"
        render={({ field }) => (
          <TextInput
            errors={errors}
            field={field}
            label="Unit"
            onHandleUnitChange={handleUnitChange}
          />
        )}
      />
      <div className="checkout-container">
        <div className="checkout-item-wrapper">
          <p className="checkout-label">Cost of share:</p>
          <p className="checkout-value">
            {formatNumberToLocaleString(costOfShare)}
          </p>
        </div>

        <div className="checkout-item-wrapper">
          <p className="checkout-label">Cost of Transaction:</p>
          <p className="checkout-value">
            {formatNumberToLocaleString(trxCost)}
          </p>
        </div>

        <div className="checkout-item-wrapper">
          <p className="checkout-label">Current Account Balance:</p>
          <p className="checkout-value">
            {formatNumberToLocaleString(balance)}
          </p>
        </div>

        <Button type="submit" variant="contained">
          Next
        </Button>
      </div>
    </form>
  );
};

export default TradeForm;
