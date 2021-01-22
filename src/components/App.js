import React, { useState, useEffect } from "react";
import axios from "axios";
import Chessboard from "chessboardjsx";
import Board from "./Board";
import "./custom.scss";

const App = () => {
    return (
        <span>
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
