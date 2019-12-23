import React from "react";
import { shallow, mount, render } from "enzyme";
import {
  Gameboard,
  handleBoardClick,
  handleLeftClick,
  handleRightClick,
  clearZeroes
} from "../src/gameFunctions.js";
import { testboard1 } from "./testboards.js";
import { testboard2 } from "./testboards.js";

/* ********************** */
/* Board Generation Tests */
/* ********************** */
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
  const target = board[3][3];
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
  gameboard.updateTouchingCountsFromMinePosition(target);
  const afterUpdate = getAdjacentTouchingCounts();
  afterUpdate.forEach((afterUpdate, idx) => {
    expect(beforeUpdate[idx] + 1).toBe(afterUpdate);
  });
});

/* *********************** */
/* Gameplay Function Tests */
/* *********************** */
test("Should set isClicked true on left click when cell not flagged or questioned", () => {
  const target = testboard1.board[0][1];
  const dispatch = jest.fn();

  const clickData = {
    clickType: "leftClick",
    board: testboard1,
    target,
    dispatch
  };
  handleBoardClick(clickData);
  expect(target.isClicked).toBe(true);
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith({
    type: "UPDATE_BOARD",
    payload: testboard1
  });
});

test("Should end game if a cell with property isMine: true is left clicked", () => {
  const target = testboard1.board[0][0];
  const dispatch = jest.fn();

  const clickData = {
    clickType: "leftClick",
    board: testboard1,
    target,
    dispatch
  };
  handleBoardClick(clickData);
  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch).toHaveBeenCalledWith({ type: "GAME_OVER", payload: true });
});

test("Should not allow left click on cell that is questioned or flagged", () => {
  const target = testboard1.board[0][0];
  target.isFlagged = true;

  const target2 = testboard1.board[0][2];
  target2.isQuestioned = true;

  const dispatch = jest.fn();

  const clickData = {
    clickType: "leftClick",
    board: testboard1,
    target,
    dispatch
  };

  const clickData2 = {
    clickType: "leftClick",
    board: testboard1,
    target: target2,
    dispatch
  };
  handleBoardClick(clickData);
  expect(dispatch).toHaveBeenCalledTimes(0);

  handleBoardClick(clickData2);
  expect(dispatch).toHaveBeenCalledTimes(0);

  const controlClickData = {
    clickType: "leftClick",
    board: testboard1,
    target: testboard1.board[0][3],
    dispatch
  };

  handleBoardClick(controlClickData);
});

test("Should update an empty cell to be flagged on right click", () => {
  const target = testboard1.board[0][4];
  const dispatch = jest.fn();

  const clickData = {
    clickType: "rightClick",
    board: testboard1,
    target,
    dispatch
  };
  handleBoardClick(clickData);
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith({
    type: "UPDATE_BOARD",
    payload: testboard1
  });
  expect(target.isFlagged).toBe(true);
  expect(target.isClicked).toBe(false);
  expect(target.isQuestioned).toBe(false);
});

test("Shoud update a cell marked as isFlagged to isQuestioned when right clicked", () => {
  const target = testboard1.board[0][5];
  target.isFlagged = true;

  const dispatch = jest.fn();

  const clickData = {
    clickType: "rightClick",
    board: testboard1,
    target,
    dispatch
  };
  handleBoardClick(clickData);
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith({
    type: "UPDATE_BOARD",
    payload: testboard1
  });
  expect(target.isQuestioned).toBe(true);
  expect(target.isClicked).toBe(false);
  expect(target.isFlagged).toBe(false);
});

test("Should update a cell marked as question to cleared when right clicked", () => {
  const target = testboard1.board[0][6];
  target.isQuestioned = true;

  const dispatch = jest.fn();

  const clickData = {
    clickType: "rightClick",
    board: testboard1,
    target,
    dispatch
  };
  handleBoardClick(clickData);
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith({
    type: "UPDATE_BOARD",
    payload: testboard1
  });
  expect(target.isQuestioned).toBe(false);
  expect(target.isClicked).toBe(false);
  expect(target.isFlagged).toBe(false);
});

test("Should not update a cell that is already marked isClicked on right click", () => {
  const target = testboard1.board[0][7];
  target.isClicked = true;

  const dispatch = jest.fn();

  const clickData = {
    clickType: "rightClick",
    board: testboard1,
    target,
    dispatch
  };
  handleBoardClick(clickData);
  expect(dispatch).toHaveBeenCalledTimes(0);
});

test("Should clear all neighboring cells that are touching zero mines when a cell touching zero mines itself is cleared", () => {
  const { board } = testboard2;
  const target = board[0][0];

  clearZeroes(target);
  expect(target.isClicked).toBe(true);
  expect(board[0][1].isClicked).toBe(true);
  expect(board[1][0].isClicked).toBe(true);
  expect(board[1][1].isClicked).toBe(true);
  expect(board[0][2].isClicked).toBe(false);
  expect(board[1][2].isClicked).toBe(false);
  expect(board[2][0].isClicked).toBe(false);
  expect(board[2][1].isClicked).toBe(false);

  const target2 = board[2][4];
  clearZeroes(target2);
  expect(target.isClicked).toBe(true);
  expect(board[1][4].isClicked).toBe(true);
  expect(board[1][3].isClicked).toBe(true);
  expect(board[2][3].isClicked).toBe(true);
  expect(board[3][3].isClicked).toBe(true);
  expect(board[3][4].isClicked).toBe(true);
});
