import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

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
              {options.map((item) => (
                <MenuItem value={item}>{item?.label}</MenuItem>
              ))}
            </TextField>
          );
        }}
      />
    </>
  );
};

export default UiSelect;
