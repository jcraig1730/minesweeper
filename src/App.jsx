import React from "react";
import Board from "./components/board/Board.jsx";
import { useStateValue } from "./state/AppState.jsx";

export default function App() {
  const [{ mineCount, xCount, yCount }, dispatch] = useStateValue();
  return (
    <div>
      <div>helo</div>
    </div>
  );
}
