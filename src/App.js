import logo from "./logo.svg";
import "./App.css";
import RoutesComponent from "./container/Routes";
import { Provider } from "react-redux";
import { store } from "./container/redux/store";
import { useEffect, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { GET_COLOR_SCHEME } from "./config/helper/colorSchemeHelper";
import { Toaster } from "react-hot-toast";
import { TOASTER_CONFIG } from "./config/constants/TOASTER_CONFIG";

function App() {
  const theme =
    store?.liftedStore?.getState()?.computedStates?.[0]?.state?.theme?.theme;

  useEffect(() => {
    document.body.style.backgroundColor = theme == "dark" ? "black" : "white";
  }, [theme]);

  return (
    <div style={{ backgroundColor: GET_COLOR_SCHEME(theme)?.BACKGROUND }}>
      <Provider store={store}>
        <Toaster {...TOASTER_CONFIG} />
        <RoutesComponent />
      </Provider>
    </div>
  );
}

export default App;
