import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./custom.scss";

class Board extends Component {
    static propTypes = { children: PropTypes.func };

    state = { fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" };

    componentDidMount() {
        this.setState({ fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" });
    }

    onDrop = ({ sourceSquare, targetSquare }) => {
        console.log(sourceSquare, targetSquare); //remember to upper case
        this.validateMove(sourceSquare, targetSquare);
    };

    validateMove = async (from, to) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            method: "POST",
            url: "https://mugglechess.azurewebsites.net/api/move",
            //url: "http://localhost:4001/api/move",
            data: {
                fen: this.state.fen,
                moveFrom: from,
                moveTo: to,
            },
        };

        await axios
            .request(config)
            .then((res) => {
                console.log(res.data);
                this.setState({ fen: res.data });
                //console.log(res.data.board);
            })
            .catch((error) => {
                console.log("there was a problem validating move from server");
                console.error(error);
            });
    };

    render() {
        return this.props.children({ position: this.state.fen, onDrop: this.onDrop });
    }
}

export default Board;
