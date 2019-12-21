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
  }
};
