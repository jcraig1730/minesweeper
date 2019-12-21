import React, { useState } from "react";
import styles from "./cell.css";

export default function Cell({ cellData }) {
  // handleClick = e => {
  // check if cell isMine and end game if it is, otherwise
  // dispatch action to update this cells isClicked or isFlagged value
  // };
  return (
    <div className={styles.cell}>
      {cellData.isFlagged
        ? "fl"
        : cellData.isClicked
        ? cellData.touching
        : null}
    </div>
  );
}
