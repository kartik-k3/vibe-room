import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";

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
  return (
    <>
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
          <Route path="/login" element={<></>} />
        </Routes>
      </BrowserRouter>
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
