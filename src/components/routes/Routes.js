import { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../Login";
import Principal from "../Principal";

const Routes = () => {
   return (
      <Fragment>
         <Switch>
            <Route path="/" exact>
               <Redirect to="/login" />
            </Route>
            <Route path="/login" exact>
               <Login />
            </Route>
            <Route path="/dashboard" exact>
               <Principal />
            </Route>
         </Switch>
      </Fragment>
   );
};

export default Routes;
