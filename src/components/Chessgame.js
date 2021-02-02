import React from "react";
import Board from "./Board";
import Chessboard from "chessboardjsx";
import axios from "axios";
import Chess from "chess.js";
const clientConfig = require("../config.js");

//const game = new Chess();

//"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" is start position

class Chessgame extends React.Component {
    state = {
        chessGame: {},
    };

    componentDidMount() {
        //this.setState({ fen: game.fen() });
        this.setState({ chessGame: new Chess() });
    }

    //Get the board state that is saved in the database
    getPosition = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
            },
            method: "GET",
            url: `${clientConfig.backendURL}/api/boardstate`,
        };

        let result = {};

        await axios
            .request(config)
            .then((res) => {
                result = res.data;
                console.log(result);
            })
            .catch((error) => {
                console.log("there was a problem getting position names from db");
                console.error(error);
            });

        //return result;
    };

    render() {
        return (
            <span style={boardContainer}>
                <Board chessGame={this.state.chessGame}>
                    {({ position, onDrop }) => (
                        <Chessboard id='muggle-chess-1' position={position} onDrop={onDrop} />
                    )}
                </Board>
                <button type='button' onClick={() => this.getPosition()} className='btn btn-outline-info'>
                    Print FEN to Console
                </button>
                <button type='button' onClick={() => console.log("test")} className='btn btn-outline-warning'>
                    Get Saved Board State
                </button>
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
