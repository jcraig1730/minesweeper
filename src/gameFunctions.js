class Board {
  constructor(xCount, yCount, mineCount) {
    this.xCount = xCount;
    this.yCount = yCount;
    this.mineCount = mineCount;
    this.board = this.createBoard();
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
          isClicked: false
        });
        col++;
      }
    }
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
      this.board[xCoord][yCoord].isMine = true;
      this.updateTouchingCountsFromMinePosition(xCoord, yCoord);
    });
  }

  updateTouchingCountsFromMinePosition(x, y) {
    if (this.board[x - 1] !== undefined) {
      this.board[x - 1][y].touching = this.board[x - 1][y].touching + 1;
      if (this.board[y - 1] !== undefined) {
        this.board[x - 1][y - 1].touching =
          this.board[x - 1][y - 1].touching + 1;
      }
      if (this.board[x - 1][y + 1] !== undefined) {
        this.board[x - 1][y + 1].touching =
          this.board[x - 1][y + 1].touching + 1;
      }
    }
    if (this.board[x][y + 1] !== undefined) {
      this.board[x][y + 1].touching = this.board[x][y + 1].touching + 1;
    }
    if (this.board[x][y - 1] !== undefined) {
      this.board[x][y - 1].touching = this.board[x][y - 1].touching + 1;
    }
    if (this.board[x + 1] !== undefined) {
      this.board[x + 1][y].touching = this.board[x + 1][y].touching + 1;
      if (this.board[x + 1][y - 1] !== undefined) {
        this.board[x + 1][y - 1].touching =
          this.board[x + 1][y - 1].touching + 1;
      }
      if (this.board[x + 1][y + 1] !== undefined) {
        this.board[x + 1][y + 1].touching =
          this.board[x + 1][y + 1].touching + 1;
      }
    }
  }
}

module.exports = { Gameboard: Board };
