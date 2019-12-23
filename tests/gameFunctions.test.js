import React from "react";
import { shallow, mount, render } from "enzyme";
import { Gameboard } from "../src/gameFunctions.js";

test("Shoud return a new board with the correct number of rows", () => {
  const gameboard = new Gameboard(10, 10, 5);
  const { board } = gameboard;
  expect(board.length).toBe(10);
});

test("Should return a new board with the correct number of columns in each row", () => {
  const gameboard = new Gameboard(10, 10, 5);
  const { board } = gameboard;
  board.forEach(row => {
    expect(row.length).toBe(10);
  });
});

test("Should return a gameboard with the correct number of mines", () => {
  const gameboard = new Gameboard(10, 10, 5);
  const { board } = gameboard;
  let mineCount = 0;
  board.forEach(row =>
    row.forEach(col => {
      if (col.isMine) mineCount++;
    })
  );
  expect(mineCount).toBe(5);
});

test("Should increment touching property for each adjacent position of a mine", () => {
  const gameboard = new Gameboard(10, 10, 5);
  const { board } = gameboard;
  const target = [3, 3];
  const getAdjacentTouchingCounts = () => [
    board[2][2].touching,
    board[2][3].touching,
    board[2][4].touching,
    board[3][2].touching,
    board[3][4].touching,
    board[4][2].touching,
    board[4][3].touching,
    board[4][4].touching
  ];
  const beforeUpdate = getAdjacentTouchingCounts();
  gameboard.updateTouchingCountsFromMinePosition(3, 3);
  const afterUpdate = getAdjacentTouchingCounts();
  afterUpdate.forEach((afterUpdate, idx) => {
    expect(beforeUpdate[idx] + 1).toBe(afterUpdate);
  });
});
