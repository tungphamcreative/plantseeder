import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import Menu from "./Menu";
import '../styles/App.scss';

import { withAuthentication } from './Session';
import { AuthUserContext } from './Session';

const Index = () => (
    <div className="app">
        <AuthUserContext.Consumer>
            {
                authUser =>
                    authUser ?
                        <Menu />
                        : null
            }
        </AuthUserContext.Consumer>
        <div className="drawerContent">
            <Router>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/forgotpassword" component={ForgotPassword} />
                    <Route exact path="/changepassword" component={ChangePassword} />
                </Switch>
            </Router>
        </div>
    </div>
);

export default withAuthentication(Index);