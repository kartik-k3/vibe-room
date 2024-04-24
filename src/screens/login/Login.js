import { useForm } from "react-hook-form";
import TextInputField from "../../components/ui/TextInputField";
import { Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../container/redux/reduxSlice/ThemeSlice";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const color = useSelector((state) => state.theme);
  const reduxDispatch = useDispatch();

  const handleClick = async (formData) => {
    debugger;
    reduxDispatch(toggleTheme());
    // createUserWithEmailAndPassword(auth, formData?.email, formData?.password)
    //   .then((userCredentials) => {
    //     console.log(userCredentials);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const debug = () => {
    debugger;
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
    <div>
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
      <Button
        sx={{ textTransform: "none" }}
        onClick={handleSubmit(handleClick)}
        variant="outlined"
      >
        Log In
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
  );
};

export default Login;
