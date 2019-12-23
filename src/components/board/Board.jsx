import React, { useEffect, useState } from "react";
import { useStateValue } from "../../state/AppState.jsx";
import CellRow from "../cellRow/CellRow.jsx";

export default function Board({ board }) {
  const [{ mineCount, xCount, yCount }, dispatch] = useStateValue();
  // const [rows, setRows] = useState([]);
  // useEffect(() => {
  //   board.board.forEach(row => setRows(rows.push(row)));
  // });
  return (
    <div>
      {board.board.map(row => (
        <CellRow cells={row} />
      ))}
    </div>
  );
}
