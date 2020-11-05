import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components";
import * as serviceWorker from "./serviceWorker";
import { RootStateProvider } from "./context/RootStateContext";

ReactDOM.render(
  <React.StrictMode>
    <RootStateProvider>
      <App />
    </RootStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
