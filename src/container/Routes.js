import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { getDesignTokens } from "../config/helper/colorSchemeHelper";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@mui/material";

const LOGIN_PAGE = React.lazy(() => import("../screens/login/Login"));
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
  const themeMode = useSelector((state) => state.theme);
  const theme = useMemo(() => getDesignTokens(themeMode));
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {Object.keys(PATHS).map((path, idx) => {
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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

const PATHS = {
  dashboard: () => (
    <>
      <h1>Dashboard</h1>
    </>
  ),
  meeting: () => (
    <>
      <h1>Meeting</h1>
    </>
  ),
};
export default RoutesComponent;
