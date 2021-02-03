import { Component } from "react";
import axios from "axios";
import "./custom.scss";
const clientConfig = require("../config.js");

//"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" is start position

class Board extends Component {
    state = {
        fen: "",
    };

    componentDidMount() {
        this.setState({
            fen: this.props.game.fen(),
        });
    }

    onDrop = ({ sourceSquare, targetSquare }) => {
        console.log(sourceSquare, targetSquare);
        const move = this.props.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        });

        if (move === null) return;

        this.setState({ fen: this.state.fen });

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
                fen: this.props.game.fen(),
            },
        };

        await axios.request(config).catch((error) => {
            console.log("there was a problem validating move from server");
            console.error(error);
        });
    };

    render() {
        return this.props.children({ position: this.props.game.fen(), onDrop: this.onDrop });
    }
}

export default Board;
