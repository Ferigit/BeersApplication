import { combineReducers } from "redux";
import Home from "./Home";
import Auth from "./Auth";

export default combineReducers({
  Auth: Auth,
  Home: Home
});
