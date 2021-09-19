import { Route, Switch, Redirect } from "react-router-dom";
import { Fragment } from "react";

import PrivateRoute from "./PrivateRoute";
import Principal from "../Principal";
import Login from "../Login";
import Crear from "../Crear";

const Routes = () => {
   return (
      <Fragment>
         <Switch>
            <Route path="/" exact>
               <Redirect to="/dashboard" />
            </Route>
            <Route path="/login" exact>
               <Login />
            </Route>
            <PrivateRoute path="/dashboard" exact component={Principal} />
            <PrivateRoute path="/empleados" exact component={Crear} />
         </Switch>
      </Fragment>
   );
};

export default Routes;
