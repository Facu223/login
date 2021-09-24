import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
   const token = localStorage.getItem("authToken");

   return (
      <Route {...rest}>
         {token ? <Component /> : <Redirect to="/login" />}
      </Route>
   );
};

export default PrivateRoute;
