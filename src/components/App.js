import React from "react";
import Board from "./Board";
import Chessboard from "chessboardjsx";
import "./custom.scss";

const App = () => {
    return (
        <span>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='/'>
                        Muggle Chess
                    </a>
                    <a className='nav-link active' href='/' aria-current='page'>
                        Login
                    </a>
                </div>
            </nav>
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
