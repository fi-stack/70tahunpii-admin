import { combineReducers } from "redux";
import { admin } from "./admin";
import {
  participants,
  participantsCompleted,
  participantsCompletedByLocation,
  participantsExpired,
  podiumFinisher,
} from "./participant";
import { provinces, cities } from "./address";
import { activities, activityDetails } from "./activities";

const reducer = combineReducers({
  admin,
  participants,
  participantsCompleted,
  participantsCompletedByLocation,
  participantsExpired,
  provinces,
  cities,
  podiumFinisher,
  activities,
  activityDetails,
});

export default reducer;
