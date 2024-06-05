import { onAuthStateChanged } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { setUserData } from "../redux/reduxSlice/UserSlice";

const withAuthentication = (Component) => {
  //This HOC is used for SRP (Single Responsibility Principle) for Routes component only. So that we don't have to include authentication logic inside the Routes file, and the responsibility of the Routes File stays the same and this logic just attaches to the Routes component.
  return (props) => {
    const reduxDispatch = useDispatch();
    //Authentication change listener method
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user?.uid) {
          try {
            const result = jwtDecode(user.accessToken);
            reduxDispatch(setUserData(result));
          } catch (error) {
            console.error(error);
          }
        }
      });
      // eslint-disable-next-line
    }, []);

    return <Component {...props} />;
  };
};

export default withAuthentication;
