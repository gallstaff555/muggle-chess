import { Component } from "react";
//import PropTypes from "prop-types";
import Chess from "chess.js";
import axios from "axios";
import "./custom.scss";
const clientConfig = require("../config.js");

//"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" is start position
const game = new Chess();

class Board extends Component {
    //static propTypes = { children: PropTypes.func };

    state = {
        //fen: game.fen(),
        //fen: this.props.chessGame.fen(),
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    };

    componentDidMount() {
        this.setState({ fen: game.fen() });
    }

    onDrop = ({ sourceSquare, targetSquare }) => {
        console.log(sourceSquare, targetSquare);
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        });

        if (move === null) return;

        this.setState({ fen: game.fen() });

        this.sendMove();
    };

    //send the server the latest board state after a move was played
    sendMove = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
            },
            method: "POST",
            url: `${clientConfig.backendURL}/api/move`,
            data: {
                fen: this.state.fen,
            },
        };

        await axios.request(config).catch((error) => {
            console.log("there was a problem validating move from server");
            console.error(error);
        });
    };

    render() {
        return this.props.children({ position: this.state.fen, onDrop: this.onDrop });
    }
}

export default Board;
