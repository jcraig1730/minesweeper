import React, { useEffect } from "react";
import { useStateValue } from "../../state/AppState.jsx";
import styles from "./smiley.css";

export default function Smiley() {
  const [{ isGameOver, isMouseDown, isWinner }, dispatch] = useStateValue();
  return (
    <div className={styles.smileyWrapper}>
      <div className={styles.smiley}>
        {isGameOver ? (isWinner ? "🤠" : "😵") : isMouseDown ? "😮" : "😏"}
      </div>
    </div>
  );
}
