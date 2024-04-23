import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextInputField = (
  {
    name = "",
    control,
    rules = { required: false },
    multiline = false,
    label = name,
    placeholder = "",
  },
  props
) => {
  return (
    <div>
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
            margin="normal"
            placeholder={placeholder}
            helperText={error?.message || ""}
            error={error}
            {...props}
          />
        )}
      />
    </div>
  );
};

export default TextInputField;
