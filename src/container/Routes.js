import { ThemeProvider } from "@mui/material";
import Proptypes from "prop-types";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getDesignTokens } from "../config/helper/colorSchemeHelper";

const LOGIN_PAGE = React.lazy(() => import("../screens/login/Login"));
const RESET_PAGE = React.lazy(() => import("../screens/login/Reset"));

const OpenRoute = ({ component: Component }) => {
  return (
    <>
      <React.Suspense>
        <Component />
      </React.Suspense>
    </>
  );
};

const ClosedRoute = ({ component }) => {
  return <OpenRoute component={component} />;
};

const RoutesComponent = () => {
  //Theme States
  const themeMode = useSelector((state) => state.theme);
  const theme = useMemo(() => getDesignTokens(themeMode), [themeMode]);

  //Authentication should not be handled here, single responsibility principle
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {Object?.keys(PATHS)?.map((path, idx) => {
              return (
                <>
                  <Route
                    key={idx}
                    path={`/${path}`}
                    element={<ClosedRoute component={PATHS[path]} />}
                  />
                </>
              );
            })}
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route
              path="/login"
              element={<ClosedRoute component={LOGIN_PAGE} />}
            />
            <Route
              path="/reset"
              element={<ClosedRoute component={RESET_PAGE} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

OpenRoute.propTypes = {
  component: Proptypes.element,
};

ClosedRoute.propTypes = {
  component: Proptypes.element,
};

const PATHS = {
  dashboard: React.lazy(() => import("../screens/home/EntryScreen")),
  "dashboard/:id": React.lazy(() => import("../screens/dashboard/Dashboard")),
  meeting: () => (
    <>
      <h1>Meeting</h1>
    </>
  ),
};

export default RoutesComponent;
