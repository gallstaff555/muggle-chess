import React from "react";
import Board from "./Board";
import Chessboard from "chessboardjsx";

class Chessgame extends React.Component {
    render() {
        return (
            <span style={boardContainer}>
                <Board>
                    {({ position, onDrop }) => (
                        <Chessboard id='muggle-chess-1' position={position} onDrop={onDrop} />
                    )}
                </Board>
            </span>
        );
    }
}

export default Chessgame;

const boardContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
};
