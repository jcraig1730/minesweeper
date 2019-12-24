import React, { useState } from "react";
import styles from "./cell.css";
import { useStateValue } from "../../state/AppState.jsx";
import { handleBoardClick } from "../../gameFunctions.js";

export default function Cell({ cellData }) {
  const [{ board, isGameOver, isWinner }, dispatch] = useStateValue();
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

  const handleClick = e => {
    const [rowStr, columnStr] = e.currentTarget.id.split("x");
    const target = board.board[Number(rowStr)][Number(columnStr)];
    const clickType = e.type === "click" ? "leftClick" : "rightClick";
    handleBoardClick({ clickType, board, target, dispatch });
    if (isGameOver && !isWinner) {
    }
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
        <img
          className={styles.flag}
          src={
            isGameOver
              ? cellData.isMine
                ? "./assets/flag_correct.png"
                : "./assets/flag_wrong.png"
              : "./assets/flag.png"
          }
          alt=""
        />
      ) : cellData.isQuestioned ? (
        <img
          className={styles.flag}
          src={
            isGameOver
              ? cellData.isMine
                ? "./assets/question_correct.png"
                : "./assets/question_wrong.png"
              : "./assets/question.png"
          }
          alt=""
        />
      ) : cellData.isMine ? (
        <img
          className={styles.flag}
          src={
            isGameOver
              ? cellData.isClicked
                ? "./assets/mine_clicked.png"
                : "./assets/mine.png"
              : ""
          }
          alt=""
        />
      ) : cellData.isClicked ? (
        cellData.touching > 0 ? (
          cellData.touching
        ) : (
          ""
        )
      ) : null}
    </div>
  );
}
