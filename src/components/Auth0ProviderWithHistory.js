import React from "react";
import config from "../config";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

//Used to direct users to Auth0 login page
//User browser history is saved in order to send user back to site
//they came from
const Auth0ProviderWithHistory = ({ children }) => {
    const domain = config.auth0domain;
    const clientId = config.auth0clientID;

    const history = useHistory();

    //handle the event where Auth0 redirects your users
    //from the Auth0 Universal Login page to your React application
    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
