import { Button } from "@mui/material";
import TextInputField from "../../components/ui/TextInputField";
import UIBackground from "../../components/uiCard/UIBackground";
import UICard from "../../components/uiCard/UICard";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const Reset = (props) => {
  const { control, handleSubmit } = useForm();

  const handleResetPassword = (formData) => {
    sendPasswordResetEmail(auth, formData?.email)
      .then(() => {
        console.log("Password Reset Email sent!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <UIBackground
      customStyle={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UICard
        customStyle={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: "20vw",
        }}
      >
        <TextInputField
          name="email"
          label="Email"
          control={control}
          rules={{ required: "This Field is Required" }}
        />
        <div>
          <Button onClick={handleSubmit(handleResetPassword)}>
            Reset Password
          </Button>
        </div>
      </UICard>
    </UIBackground>
  );
};

export default Reset;
