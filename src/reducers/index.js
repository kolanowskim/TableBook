import { combineReducers } from "redux";
import currentTableReducer from "./currentTableReducer";
import tablesReducer from "./tablesReducer";

const allReducers = combineReducers({
  currentTable: currentTableReducer,
  tables: tablesReducer,
});

export default allReducers;
