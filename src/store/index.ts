import { combineReducers, legacy_createStore } from "redux";
import { commonReducer } from "./reducer/common.reducer";
const redicers = combineReducers({ common: commonReducer });
export default legacy_createStore(
  redicers
  // (window as any)?.__REDUX_DEVTOOLS_EXTENSION__ && (window as any)?.__REDUX_DEVTOOLS_EXTENSION__()
);
