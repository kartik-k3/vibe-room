import "./App.css";
import React from "react";
import RoutesComponent from "./container/Routes";
import { Provider } from "react-redux";
import { store } from "./container/redux/store";
import { useEffect } from "react";
import { GET_COLOR_SCHEME } from "./config/helper/colorSchemeHelper";
import { Toaster } from "react-hot-toast";
import { TOASTER_CONFIG } from "./config/constants/TOASTER_CONFIG";
import { WebRTCProvider } from "./container/webRTCContext/WebRTCContext";

function App() {
  const theme =
    store?.liftedStore?.getState()?.computedStates?.[0]?.state?.theme?.theme;

  useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "black" : "white";
  }, [theme]);

  return (
    <div style={{ backgroundColor: GET_COLOR_SCHEME(theme)?.BACKGROUND }}>
      <Provider store={store}>
        <WebRTCProvider>
          <Toaster {...TOASTER_CONFIG} />
          <RoutesComponent />
        </WebRTCProvider>
      </Provider>
    </div>
  );
}

export default App;
