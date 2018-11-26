import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Firebase, { FirebaseContext } from "./components/Firebase";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

const Index = () => (
  <Router>
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/signin" component={SignIn} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Index />
  </FirebaseContext.Provider>
  , document.getElementById("index"));