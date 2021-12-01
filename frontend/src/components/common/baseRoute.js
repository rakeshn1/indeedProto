import React from "react";
// import { useSelector } from "react-redux";
import { getCurrentUser, getJwt } from "../../services/auth";
import { Route, Redirect } from "react-router-dom";

const BaseRoute = ({ path, component: Component, render, ...rest }) => {
  const jwt = getJwt();
  const user = getCurrentUser();
  console.log("Got user data again in BASE ROUTE: ", user);
  //   console.log("user.role === 2: ", user.role === 2);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (jwt) {
          console.log("Base route = YES JWT");
          if (user.role === 0) {
            return (
              <Redirect
                to={{
                  pathname: "/admin",
                }}
              ></Redirect>
            );
          } else if (user.role === 1) {
            return (
              <Redirect
                to={{
                  pathname: "/employer",
                }}
              ></Redirect>
            );
          } else if (user.role === 2) {
            return (
              <Redirect
                to={{
                  pathname: "/jobSeekerLandingPage",
                }}
              ></Redirect>
            );
          }
        }

        return Component ? <Component {...props}></Component> : render(props);
      }}
    ></Route>
  );
};

export default BaseRoute;
