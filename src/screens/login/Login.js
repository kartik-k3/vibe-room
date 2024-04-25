import { useForm } from "react-hook-form";
import TextInputField from "../../components/ui/TextInputField";
import { Box, Button, Typography } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../container/redux/reduxSlice/ThemeSlice";
import UICard from "../../components/uiCard/UICard";
import UIBackground from "../../components/uiCard/UIBackground";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { setUserData } from "../../container/redux/reduxSlice/UserSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const color = useSelector((state) => state.theme);
  const reduxDispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {
    // createUserWithEmailAndPassword(auth, formData?.email, formData?.password)
    //   .then((userCredentials) => {
    //     console.log(userCredentials);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
        return result;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        throw error;
      });
    toast.promise(signInPromise, {
      loading: "Signing You In...",
      success: "Signed in Successfully!",
      error: "There was a Problem While Signing You In",
    });
  };

  const debug = () => {
    debugger;
    toast.loading("Succesfully Signed In!");
    console.log(color?.theme);
    let intervals = [
      [1, 4],
      [0, 4],
    ];
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < intervals.length - 1; i++) {
      if (intervals[i][1] >= intervals[i + 1][0]) {
        if (intervals[i][1] > intervals[i + 1][1]) {
          intervals.splice(i, 2, [intervals[i][0], intervals[i][1]]);
        } else {
          intervals.splice(i, 2, [intervals[i][0], intervals[i + 1][1]]);
        }
        i--;
      }
    }
    return intervals;
  };

  return (
    <>
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
            rules={{ required: "This Field is Required" }}
            control={control}
          />
          <TextInputField
            name="password"
            label="Password"
            rules={{ required: "This Field is Required" }}
            control={control}
          />
          <Typography
            sx={{ margin: 0, textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              navigate("/reset");
            }}
          >
            Forgot Password?
          </Typography>
          <div style={{ gap: 10, display: "flex", justifyContent: "center" }}>
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
            <Button
              variant="outlined"
              onClick={() => {
                debug();
              }}
            >
              Test
            </Button>
          </div>
          <Typography
            onClick={() => {
              setIsLogin((prevState) => !prevState);
            }}
            sx={{ margin: 0, textDecoration: "underline", cursor: "pointer" }}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </Typography>
        </UICard>
      </UIBackground>
    </>
  );
};

export default Login;
