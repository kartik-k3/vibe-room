import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const UiSelect = (
  {
    name = "",
    control,
    rules = { required: false },
    defaultValue,
    options = [{ label: "No Data", value: "No Data" }],
    label = name || "Label",
    onChangeCallback = null,
  },
  props
) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { value = defaultValue, onChange },
          fieldState: { error },
        }) => {
          return (
            <TextField
              key={defaultValue}
              value={value}
              select
              onChange={(e) => {
                onChange(e);
                onChangeCallback(e.target.value);
              }}
              label={label}
              variant="outlined"
              helperText={error?.message}
              error={error}
              sx={{ minWidth: "100%" }}
              defaultValue={defaultValue}
              {...props}
            >
              {options?.length > 0 ? (
                options.map((item, idx) => (
                  <MenuItem key={idx} value={item}>
                    {item?.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No Options</MenuItem>
              )}
            </TextField>
          );
        }}
      />
    </>
  );
};

UiSelect.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
  label: PropTypes.string,
  onChangeCallback: PropTypes.func,
};

export default UiSelect;
