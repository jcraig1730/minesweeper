const { Gameboard } = require("../src/gameFunctions.js");
const fs = require("fs");

let board = new Gameboard(5, 5, 5);
board = JSON.stringify(board);

fs.writeFile("./testGameboard2.js", board, e => {
  e ? console.log(e) : console.log("done");
});
