const { Gameboard } = require("../src/gameFunctions.js");

const testboard1 = require("./testGameboard.js");
const testboard2 = require("./testGameboard2.js");

const addNeighborsToTest = ({ board }) => {
  board.forEach(row =>
    row.forEach(cell => {
      let [targetRow, targetCol] = cell.id.split("");
      targetRow = Number(targetRow);
      targetCol = Number(targetCol);
      cell.neighbors = [];
      for (let row = targetRow - 1; row < targetRow + 2; row++) {
        for (let col = targetCol - 1; col < targetCol + 2; col++) {
          if (board[row] && board[row][col] && board[row][col] !== cell) {
            cell.neighbors.push(board[row][col]);
          }
        }
      }
    })
  );
};

const addPropertyToCells = ({ board }, [key, val]) => {
  board.forEach(row =>
    row.forEach(cell => {
      cell[key] = val;
    })
  );
};
const checkWin = () => {
  return this.minePositions.every(([xCoord, yCoord]) => {
    return this.board[xCoord][yCoord].isFlagged;
  });
};

addPropertyToCells(testboard1, ["checkWin", checkWin]);
addPropertyToCells(testboard2, ["checkWin", checkWin]);

addNeighborsToTest(testboard1);
addNeighborsToTest(testboard2);

module.exports = { testboard1, testboard2 };
