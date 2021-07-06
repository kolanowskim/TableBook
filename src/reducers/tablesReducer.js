const tablesReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHTABLES":
      return {
        ...action.payload.data,
      };

    case "ADD_TABLE_SUCCESS":
      return {
        ...state,
        [action.payload.table]: [
          ...state[action.payload.table],
          action.payload.data,
        ],
      };

    default:
      return state;
  }
};

export default tablesReducer;
