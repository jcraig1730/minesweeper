// 5 x 5 grid 5 mines
module.exports = {
  xCount: 5,
  yCount: 5,
  mineCount: 5,
  board: [
    [
      {
        isMine: false,
        touching: 0,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "00"
      },
      {
        isMine: false,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "01"
      },
      {
        isMine: true,
        touching: 0,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "02"
      },
      {
        isMine: false,
        touching: 2,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "03"
      },
      {
        isMine: true,
        touching: 0,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "04"
      }
    ],
    [
      {
        isMine: false,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "10"
      },
      {
        isMine: false,
        touching: 2,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "11"
      },
      {
        isMine: false,
        touching: 2,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "12"
      },
      {
        isMine: false,
        touching: 2,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "13"
      },
      {
        isMine: false,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "14"
      }
    ],
    [
      {
        isMine: false,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "20"
      },
      {
        isMine: true,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "21"
      },
      {
        isMine: false,
        touching: 2,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "22"
      },
      {
        isMine: false,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "23"
      },
      {
        isMine: false,
        touching: 0,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "24"
      }
    ],
    [
      {
        isMine: false,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "30"
      },
      {
        isMine: false,
        touching: 2,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "31"
      },
      {
        isMine: true,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "32"
      },
      {
        isMine: false,
        touching: 2,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "33"
      },
      {
        isMine: false,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "34"
      }
    ],
    [
      {
        isMine: false,
        touching: 0,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "40"
      },
      {
        isMine: false,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "41"
      },
      {
        isMine: false,
        touching: 1,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "42"
      },
      {
        isMine: false,
        touching: 2,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "43"
      },
      {
        isMine: true,
        touching: 0,
        isFlagged: false,
        isQuestioned: false,
        isClicked: false,
        id: "44"
      }
    ]
  ],
  minePositions: [
    [4, 4],
    [3, 2],
    [0, 2],
    [2, 1],
    [0, 4]
  ]
};
