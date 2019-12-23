import React, { useEffect, useState } from "react";
import Board from "./components/board/Board.jsx";
import Smiley from "./components/smiley/Smiley.jsx";
import { useStateValue } from "./state/AppState.jsx";
import { Gameboard } from "./gameFunctions.js";

export default function App() {
  const [{ mineCount, xCount, yCount, board }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const newBoard = new Gameboard(10, 10, 10);
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
