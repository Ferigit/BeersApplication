import { createStore, applyMiddleware } from "redux";

// Logger with default options
// import logger from "redux-logger";

// import reducer from "./reducer";
import reducers from "../redux/reducers";
const initialState = {};

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, applyMiddleware());
  return store;
}
