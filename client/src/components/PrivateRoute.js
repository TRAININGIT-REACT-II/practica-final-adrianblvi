import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../contexts/userContext";

const PrivateRoute = ({ children, ...others }) => {

  const { signedIn } = useContext(UserContext);

  return (
    <Route
      {...others}
      render={() =>
        signedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { msg: "Debes iniciar sesión primero" },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
