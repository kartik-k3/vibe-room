import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import Proptypes from "prop-types";

const TextInputField = (
  {
    name = "",
    control,
    rules = { required: false },
    multiline = false,
    label = name,
    placeholder = "",
    type = "text",
  },
  props
) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField
          variant="outlined"
          size="small"
          multiline={multiline}
          value={value}
          onChange={onChange}
          label={label}
          placeholder={placeholder}
          helperText={error?.message || ""}
          error={error}
          fullWidth={false}
          type={type}
          {...props}
        />
      )}
    />
  );
};

TextInputField.propTypes = {
  name: Proptypes.string,
  control: Proptypes.object.isRequired,
  rules: Proptypes.object,
  multiline: Proptypes.bool,
  label: Proptypes.string,
  placeholder: Proptypes.string,
  type: Proptypes.string,
};

export default TextInputField;
