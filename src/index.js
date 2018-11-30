import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import Login from "layouts/Login/Login.jsx"
import Home from "layouts/Home/Home.jsx"
import Acelera from "layouts/Programas/Acelera.jsx"
import PreInc from "layouts/Programas/PreInc.jsx"
import Inc from "layouts/Programas/Inc.jsx"

import {isAuthenticated} from "services/auth.js"

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

ReactDOM.render(

  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/visualizar/acelera/:id" component={Acelera}/>
      <PrivateRoute path="/visualizar/preinc/:id" component={PreInc}/>
      <PrivateRoute path="/visualizar/inc/:id" component={Inc}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/" component={Home}/>
      
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
