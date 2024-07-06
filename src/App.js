import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "./App.css";
import { TOASTER_CONFIG } from "./config/constants/TOASTER_CONFIG";
import { GET_COLOR_SCHEME } from "./config/helper/colorSchemeHelper";
import { store } from "./container/redux/store";
import RoutesComponent from "./container/Routes";
import { WebRTCProvider } from "./container/webRTCContext/WebRTCContext";
import withAuthentication from "./container/hoc/withAuthentication";

function App() {
  const theme = store?.getState()?.theme?.theme;

  const RoutesWithAuthentication = withAuthentication(RoutesComponent);

  useEffect(() => {
    debugger;
    document.body.style.backgroundColor = theme === "dark" ? "black" : "white";
  }, [theme]);

  return (
    <div style={{ backgroundColor: GET_COLOR_SCHEME(theme)?.BACKGROUND }}>
      <Provider store={store}>
        <Toaster {...TOASTER_CONFIG} />
        <WebRTCProvider>
          <RoutesWithAuthentication />
        </WebRTCProvider>
      </Provider>
    </div>
  );
}

export default App;
