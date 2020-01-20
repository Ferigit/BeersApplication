import React, { Component } from "react";
import { Router, browserHistory, Route, Link } from "react-router";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import "./index.css";

import Beers from "./web/container/Beers";
import BeerDetail from "./web/container/BeerDetail";

const reduxStore = configureStore({});

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <Router history={browserHistory}>
          <Route exact path="/" component={Beers} />
          <Route exact path="/beerDetail" component={BeerDetail} />
        </Router>
      </ReduxProvider>
    );
  }
}

export default App;
