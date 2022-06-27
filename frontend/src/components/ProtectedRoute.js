import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  return (
    <Route exact path={props.path}>
      {props.isLoggedIn ? props.children : <Redirect to="/sign-in" />}
    </Route>
  );
};

export default ProtectedRoute;
