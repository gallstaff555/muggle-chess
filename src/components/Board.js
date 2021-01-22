import React, { useState, useEffect } from "react";
import axios from "axios";
import Chessboard from "chessboardjsx";
import "./custom.scss";

const Board = (props) => {
    const [board, setBoard] = useState({ setup: "start" });

    useEffect(() => {
        newGame();
    }, []); //empty array means it will only fire once

    async function newGame() {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            method: "GET",
            //url: "http://localhost:4001/api/newgame",
            url: "https://mugglechess.azurewebsites.net/api/newgame",
        };

        await axios
            .request(config)
            .then((res) => {
                setBoard((prevState) => ({
                    ...prevState,
                    setup: res.data,
                }));
                //console.log(res.data.board);
            })
            .catch((error) => {
                console.log("there was a problem getting board from server");
                console.error(error);
            });
    }

    async function getMoves(boardConfiguration) {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            method: "POST",
            data: {
                board: boardConfiguration,
            },
            url: "https://mugglechess.azurewebsites.net/api/moves",
        };
    }

    return (
        <span>
            <div>{board.setup}</div>
            <React.Fragment>
                <Chessboard id='positionObject' position={board.setup} />
            </React.Fragment>
        </span>
    );
};

export default Board;

//'2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50'
