import * as React from "react";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FieldErrors } from "react-hook-form";

import "../../App.css";

type PropType = {
  children?: React.ReactNode;
  errors?: FieldErrors;
  field: any;
  label: string;
  totalSharesOwned?: number | string;
};

const errorMsg = (errorObj: any, name: string): string | null | undefined => {
  if (!errorObj) return;
  const error =
    name?.split(".")?.reduce((obj, i) => obj?.[i], errorObj) ||
    errorObj.message;
  return error?.message;
};

export default function SelectInput(props: PropType) {
  const { field = {}, errors, label, totalSharesOwned } = props;
  const { name } = field;

  return (
    <div className="checkout-container">
      <FormControl className="form-input" error={!!errorMsg(errors, name)}>
        <InputLabel>Trade</InputLabel>
        <Select label={label} {...field}>
          <MenuItem value="" hidden>
            <em>None</em>
          </MenuItem>
          <MenuItem value="purchase">Purchase</MenuItem>
          {totalSharesOwned ? <MenuItem value="sell">Sell</MenuItem> : null}
        </Select>
        <FormHelperText error>{errorMsg(errors, name)}</FormHelperText>
      </FormControl>
    </div>
  );
}
