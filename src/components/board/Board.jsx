import React from "react";
import { useAppState } from "../../state/AppState.jsx";

export default function Board() {
  const [{ mineCount, xCount, yCount }, dispatch] = useAppState();
  return <div></div>;
}
