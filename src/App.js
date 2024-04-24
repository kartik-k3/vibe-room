import logo from "./logo.svg";
import "./App.css";
import RoutesComponent from "./container/Routes";
import { Provider } from "react-redux";
import { store } from "./container/redux/store";
import { useEffect, useMemo } from "react";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RoutesComponent />
      </Provider>
    </div>
  );
}

export default App;
