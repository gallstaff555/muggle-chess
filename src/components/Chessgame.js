import React from "react";
import Board from "./Board";
import Chessboard from "chessboardjsx";
import axios from "axios";
import Chess from "chess.js";
const clientConfig = require("../config.js");

//"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" is start position
class Chessgame extends React.Component {
    state = {
        game: new Chess(),
        storedPosition: {},
    };

    //automatically retrieve saved position from database when Chessgame starts
    async componentDidMount() {
        let savedPosition = await this.getPosition();
        this.setState({ game: new Chess(savedPosition.toString()) });
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

        let storedPosition = {};

        await axios
            .request(config)
            .then((res) => {
                storedPosition = { ...JSON.parse(JSON.stringify(res.data)) };
                this.setState({ storedPosition });
            })
            .catch((error) => {
                console.log("there was a problem getting position names from db");
                console.error(error);
            });

        return storedPosition.Position;
    };

    //send the current board state to the server
    resetServerBoardState = async () => {
        console.log("fen ", this.state.game.fen());
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
            },
            method: "POST",
            url: `${clientConfig.backendURL}/api/move`,
            data: {
                fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", //default start position
            },
        };

        await axios.request(config).catch((error) => {
            console.log(config.data.fen);
            console.log("there was a problem validating move from server");
            console.error(error);
        });
    };

    //set the current board state to the latest state in the database
    updatePositionFromDB = async () => {
        await this.getPosition();
        console.log("current ", this.state.game.fen());
        console.log("db      ", this.state.storedPosition.Position);

        this.setState({ game: new Chess(this.state.storedPosition.Position) });
    };

    //reset the board to starting configuration and push to the server
    resetGame = async () => {
        await this.resetServerBoardState();
        this.setState({ game: new Chess() });
    };

    render() {
        return (
            <span style={{ textAlign: "center" }}>
                <div className='container'>
                    <div style={{ textAlign: "right" }}>
                        <Board game={this.state.game}>
                            {({ position, onDrop }) => (
                                <Chessboard id='muggle-chess-1' position={position} onDrop={onDrop} />
                            )}
                        </Board>
                    </div>
                    <br></br>
                    <div className='col-10 align-self-center'>
                        <button
                            type='button'
                            onClick={() => console.log(this.state.game.fen())}
                            className='btn btn-outline-info'
                        >
                            Print FEN to Console
                        </button>
                        <button
                            type='button'
                            onClick={() => this.updatePositionFromDB()}
                            className='btn btn-outline-warning'
                        >
                            Get Saved Board State
                        </button>
                        <button type='button' onClick={() => this.resetGame()} className='btn btn-outline-danger'>
                            Reset Board
                        </button>
                    </div>
                </div>
            </span>
        );
    }
}

export default Chessgame;

// const boardContainer = {
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
// };
