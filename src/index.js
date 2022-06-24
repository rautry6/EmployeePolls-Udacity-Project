import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import middleware from "./middleware";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer, middleware);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
