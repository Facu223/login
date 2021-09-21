import { Route, Switch, Redirect } from "react-router-dom";
import { Fragment } from "react";

import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";
import Dashboard from "../Dashboard/Dashboard";

const Routes = () => {
   return (
      <Fragment>
         <Switch>
            <Route path="/" exact>
               <Redirect to="/dashboard" />
            </Route>
            <LoginRoute path="/login" exact />
            <PrivateRoute path="/dashboard" component={Dashboard} />
         </Switch>
      </Fragment>
   );
};

export default Routes;
