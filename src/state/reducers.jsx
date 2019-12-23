export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MINE_COUNT":
      return {
        ...state,
        mineCount: action.payload
      };
    case "SET_X_COUNT":
      return {
        ...state,
        xCount: action.payload
      };
    case "SET_Y_COUNT":
      return {
        ...state,
        yCount: action.payload
      };
    case "UPDATE_BOARD":
      return {
        ...state,
        board: action.payload
      };
    case "GAME_OVER":
      return {
        ...state,
        isGameOver: action.payload
      };
    case "SET_WIN":
      return {
        ...state,
        isWinner: action.payload
      };
  }
};
