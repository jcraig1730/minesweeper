import React, { useState } from "react";
import styles from "./cell.css";
import { useStateValue } from "../../state/AppState.jsx";
import { handleBoardClick } from "../../gameFunctions.js";

export default function Cell({ cellData }) {
  const [{ board }, dispatch] = useStateValue();
  const handleClick = e => {
    const [rowStr, columnStr] = e.target.id.split("");
    const target = board.board[Number(rowStr)][Number(columnStr)];
    const clickType = e.type === "click" ? "leftClick" : "rightClick";
    handleBoardClick({ clickType, board, target, dispatch });
  };
  return (
    <div
      className={styles.cell}
      onClick={handleClick}
      onContextMenu={handleClick}
      id={cellData.id}
    >
      {cellData.isFlagged
        ? "fl"
        : cellData.isQuestioned
        ? "?"
        : cellData.isClicked
        ? cellData.touching
        : null}
    </div>
  );
}
