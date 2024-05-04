import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
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
  },
  props
) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormControl
            size="small"
            sx={{ minWidth: "150px", margin: "5px" }}
            error={error}
          >
            <InputLabel id={label}>
              <div
                style={{
                  backgroundColor: "black",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                {label}
              </div>
            </InputLabel>
            <Select
              value={value}
              onChange={onChange}
              defaultValue={defaultValue}
              labelId={label}
              variant="outlined"
              {...props}
            >
              {options.map((item) => (
                <MenuItem value={item}>{item?.label}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </>
  );
};

export default UiSelect;
