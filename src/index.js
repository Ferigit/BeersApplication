//Include bootstrap's css
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
//Include bootstrap's js
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import * as serviceWorker from "./service-worker";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById("root"));
// serviceWorker.register();
