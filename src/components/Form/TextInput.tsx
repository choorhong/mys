import * as React from "react";
import { TextField } from "@mui/material";
import { FieldErrors } from "react-hook-form";

type PropType = {
  children?: React.ReactNode;
  errors?: FieldErrors;
  field: any;
  label: string;
  onHandleUnitChange?: (unitValue: string) => void;
};

const errorMsg = (errorObj: any, name: string): string | null | undefined => {
  if (!errorObj) return;
  const error =
    name?.split(".")?.reduce((obj, i) => obj?.[i], errorObj) ||
    errorObj.message;
  return error?.message;
};

export default function TextInput(props: PropType) {
  const { errors, field, label, onHandleUnitChange } = props;
  const { name } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onHandleUnitChange && onHandleUnitChange(e.target.value);
    field.onChange(e);
  };

  return (
    <div className="general-container">
      <TextField
        className="form-input"
        {...field}
        onChange={handleChange}
        error={!!errorMsg(errors, name)}
        helperText={errorMsg(errors, name)}
        type="number"
        label={label}
        variant="outlined"
        InputProps={{
          inputProps: { min: 0 },
        }}
      />
    </div>
  );
}
