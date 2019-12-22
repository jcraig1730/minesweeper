import React, { useEffect, useState } from "react";
import Board from "./components/board/Board.jsx";
import Smiley from "./components/smiley/Smiley.jsx";
import { useStateValue } from "./state/AppState.jsx";
import { Gameboard } from "./gameFunctions.js";
import newBoard from "../tests/testGameboard2.js";

export default function App() {
  const [{ mineCount, xCount, yCount, board }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // const newBoard = new Gameboard(10, 10, 10);
    console.log(newBoard);
    let mines = [];
    for (let i = 0; i < newBoard.board.length; i++) {
      for (let j = 0; j < newBoard.board[i].length; j++) {
        if (newBoard.board[i][j].isMine) {
          mines.push(newBoard.board[i][j].id);
        }
      }
    }
    console.log(mines);

    dispatch({ type: "UPDATE_BOARD", payload: newBoard });
    setIsLoading(false);
  }, []);
  return (
    <div>
      <Smiley />
      {isLoading ? "loading..." : <Board board={board} />}
    </div>
  );
}
