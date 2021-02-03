import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading";

//protected routes can only be used if client has been authenticated with auth0
const ProtectedRoute = ({ component, ...args }) => (
    <Route
        component={withAuthenticationRequired(component, {
            onRedirecting: () => <Loading />,
        })}
        {...args}
    />
);

export default ProtectedRoute;
