/*
Main page for chess site.
*/

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Board from "./Board";
import Chessboard from "chessboardjsx";
import Navbar from "./Navbar";
import "./custom.scss";

const App = () => {
    const { isLoading } = useAuth0();

    //loading spinner
    if (isLoading) {
        return (
            <div className='loading-icon'>
                <div className='spinner-border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <span>
            <Navbar></Navbar>
            <div style={boardsContainer}>
                <Board>
                    {({ position, onDrop }) => (
                        <Chessboard id='muggle-chess-1' position={position} onDrop={onDrop} />
                    )}
                </Board>
            </div>
        </span>
    );
};

export default App;

const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
};
