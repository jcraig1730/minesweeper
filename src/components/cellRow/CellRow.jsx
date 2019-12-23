import React from "react";
import Cell from "../cell/Cell.jsx";

import styles from "./cellRow.css";

export default function CellRow({ cells }) {
  return (
    <div className={styles.cellRow}>
      {cells.map(cell => (
        <Cell cellData={cell} />
      ))}
    </div>
  );
}
