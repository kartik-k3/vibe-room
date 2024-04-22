import { useForm } from "react-hook-form";
import TextInputField from "../../components/ui/TextInputField";
import { Button } from "@mui/material";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const handleClick = (p) => {
    debugger;
  };
  return (
    <div>
      <TextInputField
        name="username"
        label={"Username"}
        rules={{ required: true }}
        control={control}
      />
    </div>
  );
};

export default Login;
