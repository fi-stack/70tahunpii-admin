import { combineReducers } from "redux";
import { admin } from "./admin";
import { participants } from "./participant";

const reducer = combineReducers({
  admin,
  participants,
});

export default reducer;
