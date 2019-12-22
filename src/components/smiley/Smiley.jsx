import React, { useEffect } from "react";
import { useStateValue } from "../../state/AppState.jsx";
import styles from "./smiley.css";

export default function Smiley() {
  const [{ isGameOver, isMouseDown, result }, dispatch] = useStateValue();
  return (
    <div className={styles.smileyWrapper}>
      <div className={styles.smiley}>
        {isGameOver
          ? result === "win"
            ? "🤠"
            : "🖕"
          : isMouseDown
          ? "😮"
          : "😏"}
      </div>
    </div>
  );
}
