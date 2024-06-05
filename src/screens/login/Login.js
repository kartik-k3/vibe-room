import React from "react";
import { useForm } from "react-hook-form";
import TextInputField from "../../components/ui/TextInputField";
import { Button, Typography } from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "../../firebase";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import UICard from "../../components/uiCard/UICard";
import UIBackground from "../../components/uiCard/UIBackground";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { setUserData } from "../../container/redux/reduxSlice/UserSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { OAUTH } from "../../config/constants/OAUTH_LIST";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const reduxDispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const noAccountMessage = "Don't have an account yet?";

  // eslint-disable-next-line
  const handleSignUp = async (formData) => {
    // createUserWithEmailAndPassword(auth, formData?.email, formData?.password)
    //   .then((userCredentials) => {
    //     console.log(userCredentials);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const handleOauthFlow = (provider) => {
    const popupPromise = signInWithPopup(auth, provider)
      .then((result) => {
        reduxDispatch(setUserData(result?.user));
        navigate("/dashboard");
        return "Popup sent";
      })
      .catch((error) => {
        console.error(error.message);
        return "Popup Error";
      });
    toast.promise(popupPromise, {
      loading: "Looking for Sign in App...",
      success: "Successfully Logged In",
      error: "Could not open sign in",
    });
  };

  const handleSignIn = async (formData) => {
    const signInPromise = signInWithEmailAndPassword(
      //creating a promise to show the status in toast.
      auth,
      formData?.email,
      formData?.password
    )
      .then((userCredential) => {
        localStorage.setItem("jwt", userCredential?.user?.accessToken);
        const result = jwtDecode(userCredential?.user?.accessToken);
        reduxDispatch(setUserData(result));
        navigate("/dashboard");
        return result; //We have to put a return in the .then to create a promise.
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        return error.message;
      });
    toast.promise(signInPromise, {
      loading: "Signing You In...",
      success: "Signed in Successfully!",
      error: "There was a Problem While Signing You In",
    });
  };

  return (
    <>
      <UIBackground
        customStyle={{
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
            rules={{ required: "This Field is Required" }}
            control={control}
          />
          <TextInputField
            name="password"
            label="Password"
            rules={{ required: "This Field is Required" }}
            control={control}
            type="password"
          />
          <div>
            <Typography
              component={"span"}
              sx={{
                margin: 0,
                textDecoration: "underline",
                cursor: "pointer",
                display: "inline-block",
              }}
              onClick={() => {
                navigate("/reset");
              }}
            >
              Forgot Password?
            </Typography>
          </div>
          <div
            style={{
              gap: 10,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              sx={{ textTransform: "none", width: "100%" }}
              onClick={() => {
                if (isLogin) {
                  handleSubmit(handleSignIn)();
                } else {
                  handleSubmit(handleSignUp)();
                }
              }}
              variant="contained"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
            <p style={{ textAlign: "center", margin: 0 }}>Or Continue with</p>
            <div
              style={{
                minWidth: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                gap: 6,
              }}
            >
              {OAUTH.map((item) => {
                const Icon = item.icon;
                return (
                  <>
                    <Button
                      sx={{ backgroundColor: "white", width: "100%" }}
                      variant="contained"
                      onClick={() => {
                        handleOauthFlow(item.provider);
                      }}
                    >
                      <Icon />
                    </Button>
                  </>
                );
              })}
            </div>
            <p style={{ textAlign: "center", margin: 0 }}>{noAccountMessage}</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                onClick={() => {
                  setIsLogin((prevState) => !prevState);
                }}
                sx={{
                  margin: 0,
                  textDecoration: "underline",
                  cursor: "pointer",
                  textAlign: "center",
                  display: "inline-block",
                }}
              >
                {isLogin ? "Sign Up" : "Log In"}
              </Typography>
            </div>
          </div>
        </UICard>
      </UIBackground>
    </>
  );
};

export default Login;
