import React, { useState } from "react";
import styles from "./cell.css";
import { useStateValue } from "../../state/AppState.jsx";
import { handleBoardClick } from "../../gameFunctions.js";

export default function Cell({ cellData }) {
  const [{ board }, dispatch] = useStateValue();
  const colorMap = {
    "0": "",
    "1": "touching1",
    "2": "touching2",
    "3": "touching3",
    "4": "touching4",
    "5": "touching5",
    "6": "touching6",
    "7": "touching7",
    "8": "touching8"
  };
  if (!colorMap[String(cellData.touching)]) {
    console.log(cellData.touching);
  }
  const handleClick = e => {
    const [rowStr, columnStr] = e.currentTarget.id.split("");
    const target = board.board[Number(rowStr)][Number(columnStr)];
    const clickType = e.type === "click" ? "leftClick" : "rightClick";
    handleBoardClick({ clickType, board, target, dispatch });
  };
  return (
    <div
      className={`${styles.cell} ${
        cellData.isClicked ? styles.clearedCell : ""
      } ${styles[colorMap[String(cellData.touching)]]}`}
      onClick={handleClick}
      onContextMenu={handleClick}
      id={cellData.id}
    >
      {cellData.isFlagged ? (
        <img className={styles.flag} src="./assets/flag.png" alt="" />
      ) : cellData.isQuestioned ? (
        <img className={styles.flag} src="./assets/question.png" alt="" />
      ) : cellData.isClicked ? (
        cellData.touching
      ) : null}
    </div>
  );
}
