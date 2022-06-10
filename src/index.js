import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement API

if (module.hot) {
  module.hot.accept("./app.jsx", () => {
    const NewApp = require("./app.jsx").default;
    ReactDOM.render(<NewApp />, document.getElementById("root"));
  });
}
