import React from "react";
import { useStateValue } from "../../state/AppState.jsx";
import styles from "./options.css";

export default function Options() {
  const [{ isGameOver }, dispatch] = useStateValue();
  return (
    <div className={styles.optionsWrapper}>
      <div className={styles.buttonWrapper}>
        <button className={styles.optionButton}>
          {isGameOver ? "Start" : "Start Over"}
        </button>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.optionButton}>Change Difficulty</button>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.optionButton}>Pause</button>
      </div>
    </div>
  );
}
