import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ component: Component, ...rest }) => {
   // Check if the user is authenticated
   const state = useSelector((state) => state);
   let token = "";

   if (state.token) token = state.token;

   return (
      <Route {...rest}>
         {token ? <Component /> : <Redirect to="/login" />}
      </Route>
   );
};

export default PrivateRoute;
