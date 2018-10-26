import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import SignIn from './components/SignIn';
import './styles/Common.scss';

const Index = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
    </Switch>
  </Router>
);

ReactDOM.render(<Index />, document.getElementById("index"));