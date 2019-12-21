import React, { useEffect, useState } from "react";
import Board from "./components/board/Board.jsx";
import { useStateValue } from "./state/AppState.jsx";
import { Gameboard } from "./gameFunctions.js";

export default function App() {
  const [{ mineCount, xCount, yCount }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState();
  useEffect(() => {
    const board = new Gameboard(10, 10, 10);
    setBoard(board);
    setIsLoading(false);
  }, []);
  return <div>{isLoading ? "loading..." : <Board board={board} />}</div>;
}
