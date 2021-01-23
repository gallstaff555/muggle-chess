import { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js";
import axios from "axios";
import "./custom.scss";

//"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" is start position
const game = new Chess();

class Board extends Component {
    static propTypes = { children: PropTypes.func };

    state = { fen: game.fen() };

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

    sendMove = async () => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*", //https://gallstaff555.github.io/muggle-chess-client/
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
            },
            method: "POST",
            url: "https://mugglechess.azurewebsites.net/api/move",
            //url: "http://localhost:4001/api/move",
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
