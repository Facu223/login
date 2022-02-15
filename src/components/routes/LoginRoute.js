import { Route, Redirect } from "react-router-dom";

import Login from "../Login";

const LoginRoute = (props) => {
   const token = localStorage.getItem("authToken");

   return (
      <Route {...props}>
         {token ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
   );
};

export default LoginRoute;
