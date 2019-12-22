import React from "react";
import ReactDOM from "react-dom";
import { StateProvider } from "./state/AppState.jsx";
import { reducer } from "./state/reducers.jsx";
import App from "./App.jsx";

const initialState = {
  mineCount: 5,
  xCount: 5,
  yCount: 5,
  board: [],
  isGameOver: false,
  isMouseDown: false,
  result: ""
};

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.querySelector("#root")
);
