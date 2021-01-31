/*
Main page for chess site.
*/

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Chessgame from "./Chessgame";
import Profile from "./Profile";
import Loading from "./Loading.js";
import Navbar from "./Navbar";
import "./custom.scss";

const App = () => {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
    }
    return (
        <span>
            <Navbar />
            <br></br>
            <Switch>
                <Route path='/' exact component={Chessgame} />
                <Route path='/user' exact component={Profile} />
                <ProtectedRoute path='/profile' component={Profile} />
            </Switch>
        </span>
    );
};

export default App;
