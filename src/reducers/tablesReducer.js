const tablesReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHTABLES":
      return (state = action.payload.data);

    default:
      return state;
  }
};

export default tablesReducer;
