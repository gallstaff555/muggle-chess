import React, { useState, useEffect } from "react";
import Board from "./Board";
import "./custom.scss";

const App = () => {
    return (
        <span>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container-fluid'>
                    <a className='navbar-brand'>Muggle Chess</a>
                    <a className='nav-link active' aria-current='page'>
                        Login
                    </a>
                </div>
            </nav>
            <Board></Board>
        </span>
    );
};

export default App;

/*
const usersLookup = {
    method: "GET",
    url: "/users/names",
};

let otherUsers = [];

await axios
    .request(usersLookup)
    .then((res) => {
        otherUsers = [...res.data];
    })
    .catch((error) => {
        console.log("there was a problem getting usernames from server");
        console.error(error);
    });

this.setState({ otherUsers });
*/
