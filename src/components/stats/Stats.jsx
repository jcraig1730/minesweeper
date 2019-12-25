import React from "react";
import { useStateValue } from "../../state/AppState.jsx";

export default function Stats() {
  const [{ mineCount, flagsPlaced }, dispatch] = useStateValue();
  return (
    <div>
      <img src="./assets/flag.png" alt="flags placed" />
      <div style={{ fontSize: "2em" }}>
        {flagsPlaced}/{mineCount}
      </div>
      <img src="./assets/clock.png" alt="" />
      <div style={{ fontSize: "2em" }}>0:23</div>
    </div>
  );
}
