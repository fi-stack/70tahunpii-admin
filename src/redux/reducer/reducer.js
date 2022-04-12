import { combineReducers } from "redux";
import { admin } from "./admin";
import { participantDetails } from "./participant";

const reducer = combineReducers({
  admin,
  participantDetails,
});

export default reducer;
