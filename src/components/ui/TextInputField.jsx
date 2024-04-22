import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextInputField = ({
  name = "",
  control,
  rules = { required: false },
  multiline = false,
  label = name,
  placeholder = "",
}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange } }) => (
          <TextField
            variant="outlined"
            size="small"
            multiline={multiline}
            value={value}
            onChange={onChange}
            label={label}
            margin="normal"
            placeholder={placeholder}
          />
        )}
      />
    </div>
  );
};

export default TextInputField;
