import { Button, Typography } from "@mui/material";
import TextInputField from "../../components/ui/TextInputField";
import UIBackground from "../../components/uiCard/UIBackground";
import UICard from "../../components/uiCard/UICard";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reset = (props) => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleResetPassword = (formData) => {
    const resetPasswordPromise = sendPasswordResetEmail(auth, formData?.email)
      .then(() => {
        console.log("Password Reset Email sent!");
        return "Email sent";
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });

    toast.promise(resetPasswordPromise, {
      loading: "Sending an Email...",
      success: "Email Sent! Please Check your Email",
      error: "There was a Problem While Sending Reset Link.",
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit(handleResetPassword)}
          >
            Reset Password
          </Button>
          <Typography
            onClick={() => {
              navigate("/login");
            }}
            sx={{ textDecoration: "underline", margin: 0, cursor: "pointer" }}
          >
            Just Remembered?
          </Typography>
        </div>
      </UICard>
    </UIBackground>
  );
};

export default Reset;
