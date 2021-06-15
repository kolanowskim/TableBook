const currentTableReducer = (state = "", action) => {
  switch (action.type) {
    case "CURRENTTABLE":
      return (state = action.payload);
    default:
      return state;
  }
};

export default currentTableReducer;
