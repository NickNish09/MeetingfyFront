import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Header from "../components/shared/Header";
import RivalryPage from "../pages/Rivalry";
import NewRivalry from "../pages/NewRivalry";
import NewRivalryProvider from "../contexts/NewRivalryContext";
import CurrentUserProvider from "../contexts/CurrentUserContext";
import Trending from "../pages/Trending";
import TopRivalries from "../pages/TopRivalries";
import Register from "../pages/Register";
import RivalPage from "../pages/Rival";
import Profile from "../pages/Profile";
import EditRivalry from "../pages/EditRivalry";

const Routes = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <CurrentUserProvider>
          <Route exact path={"/"} component={Home} />
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Register} />
          <Route path={"/rivalry/:rivalryId"} component={RivalryPage} exact />
          <Route path={"/rivals/:rivalId"} component={RivalPage} />
          <Route path={"/trending"} component={Trending} />
          <Route path={"/top"} component={TopRivalries} />
          <NewRivalryProvider>
            <PrivateRoute path={"/create"} component={NewRivalry} />
            <PrivateRoute
              path={"/rivalry/:rivalryId/edit"}
              component={EditRivalry}
              exact
            />
            <PrivateRoute path={"/profile"} component={Profile} />
          </NewRivalryProvider>
        </CurrentUserProvider>
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
