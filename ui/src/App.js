import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import PrivateRoute from "../src/components/routing/PrivateRoute";

import "./index.css";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import Alerts from "./components/layouts/Alerts";

import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Navbar title={"Contact Keeper"} />
            <Alerts />
            <Switch>
              <Fragment>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/aboutus" component={AboutUs} />
              </Fragment>
            </Switch>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
