class Board {
  constructor(xCount, yCount, mineCount) {
    this.gameOver = false;
    this.win = false;
    this.flaggedMines = 0;
    this.xCount = xCount;
    this.yCount = yCount;
    this.mineCount = mineCount;
    this.board = this.createBoard();
    this.assignCellNeighbors();
    this.minePositions = this.createMinePositions();
    this.addMinesToBoard();
  }
  createBoard() {
    let board = [];
    for (let row = 0; row < this.yCount; row++) {
      let col = 0;
      while (col < this.xCount) {
        if (!board[row]) board.push([]);
        board[row].push({
          isMine: false,
          touching: 0,
          isFlagged: false,
          isQuestioned: false,
          isClicked: false,
          id: String(row) + "x" + String(col)
        });
        col++;
      }
    }
    console.log(board);
    return board;
  }

  createMinePositions() {
    let possiblePositions = [];
    let minesPlaced = 0;
    let usedPositions = {};
    while (minesPlaced < this.mineCount) {
      const x = Math.floor(Math.random() * this.xCount);
      const y = Math.floor(Math.random() * this.yCount);
      if (!usedPositions[String(x) + String(y)]) {
        possiblePositions.push([x, y]);
        minesPlaced++;
        usedPositions[String(x) + String(y)] = true;
      }
    }
    return possiblePositions;
  }

  addMinesToBoard() {
    this.minePositions.forEach(minePosition => {
      const [xCoord, yCoord] = minePosition;
      const mineCell = this.board[xCoord][yCoord];
      mineCell.isMine = true;
      this.updateTouchingCountsFromMinePosition(mineCell);
    });
  }

  updateTouchingCountsFromMinePosition(cell) {
    cell.neighbors.forEach(neighbor => neighbor.touching++);
  }

  assignCellNeighbors() {
    this.board.forEach(row =>
      row.forEach(cell => {
        let [targetRow, targetCol] = cell.id.split("x");
        targetRow = Number(targetRow);
        targetCol = Number(targetCol);
        cell.neighbors = [];
        for (let row = targetRow - 1; row < targetRow + 2; row++) {
          for (let col = targetCol - 1; col < targetCol + 2; col++) {
            if (
              this.board[row] &&
              this.board[row][col] &&
              this.board[row][col] !== cell
            ) {
              cell.neighbors.push(this.board[row][col]);
            }
          }
        }
      })
    );
  }

  checkWin() {
    return this.minePositions.every(([xCoord, yCoord]) => {
      return this.board[xCoord][yCoord].isFlagged;
    });
  }
}

function handleLeftClick(board, target, dispatch) {
  if (!target.isMine && target.touching === 0) {
    clearZeroes(target);
    dispatch({ type: "UPDATE_BOARD", payload: board });
  }
  if (target.isClicked && neighborFlagsEqualTouching(target)) {
    clearNeighbors(target, dispatch);
  }
  if (target.isQuestioned || target.isFlagged) return;
  target.isClicked = true;
  dispatch({ type: "UPDATE_BOARD", payload: board });
  if (target.isMine) {
    dispatch({ type: "GAME_OVER", payload: true });
    board.gameOver = true;
  }
}

function handleRightClick(board, target, dispatch) {
  if (!target.isClicked && !target.isFlagged && !target.isQuestioned) {
    target.isFlagged = true;
    dispatch({ type: "UPDATE_BOARD", payload: board });
    if (board.checkWin()) {
      board.win = true;
      board.gameOver = true;
      dispatch({ type: "SET_WIN", payload: true });
      dispatch({ type: "GAME_OVER", payload: true });
    }
    return;
  }
  if (target.isFlagged) {
    target.isFlagged = false;
    target.isQuestioned = true;
    dispatch({ type: "UPDATE_BOARD", payload: board });
    return;
  }
  if (target.isQuestioned) {
    target.isQuestioned = false;
    dispatch({ type: "UPDATE_BOARD", payload: board });
  }
}

function handleBoardClick(clickData) {
  const { clickType, board, target, dispatch } = clickData;
  if (board.gameOver) return;
  clickType === "leftClick"
    ? handleLeftClick(board, target, dispatch)
    : handleRightClick(board, target, dispatch);
}

function clearZeroes(target) {
  const currentIsZero = target.touching === 0;
  if (!target.isFlagged && !target.isQuestioned) target.isClicked = true;
  if (!currentIsZero) return;
  target.neighbors.forEach(neighbor => {
    if (!neighbor.isClicked) {
      clearZeroes(neighbor);
    }
  });
}

function neighborFlagsEqualTouching(target) {
  const totalFlags = target.neighbors.reduce((flagCount, neighbor) => {
    if (neighbor.isFlagged) {
      return flagCount + 1;
    } else {
      return flagCount + 0;
    }
  }, 0);
  return totalFlags >= target.touching;
}

function clearNeighbors(target, dispatch) {
  target.neighbors.forEach(neighbor => {
    if (!neighbor.isFlagged) {
      neighbor.isClicked = true;
      if (neighbor.isMine) {
        dispatch({ type: "GAME_OVER", payload: true });
      } else if (neighbor.touching === 0) {
        clearZeroes(neighbor);
      }
    }
  });
}

module.exports = {
  Gameboard: Board,
  handleBoardClick,
  handleLeftClick,
  handleRightClick,
  clearZeroes
};
