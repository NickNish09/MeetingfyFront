import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Header from "../components/shared/Header";
import Room from "../pages/Room";
import ManageRooms from "../pages/ManageRooms";
import CurrentUserProvider from "../contexts/CurrentUserContext";
import Register from "../pages/Register";

const Routes = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <CurrentUserProvider>
          <Route exact path={"/"} component={Home} />
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Register} />
          <Route path={"/sala/:roomId"} component={Room} exact />
          <Route path={"/gerenciar"} component={ManageRooms} />
        </CurrentUserProvider>
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
