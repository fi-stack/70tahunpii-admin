import { storeRegister, storeLogin, getAdmin } from "./admin";
import {
  getParticipants,
  getParticipantsCompleted,
  getParticipantsCompletedByLocation,
  getParticipantsExpired,
  destroyParticipantExpired,
  approveParticipant,
  exportPaymentRecap,
  exportNotYetPaid,
  podiumFastest,
  getPodiumFinisher,
  getPodiumFinisherExcel,
} from "./participant";
import { getProvinces, getCities } from "./address";
import { getActivities, getActivityDetails } from "./activities";

export {
  storeRegister,
  storeLogin,
  getAdmin,
  exportPaymentRecap,
  exportNotYetPaid,
  getParticipants,
  getParticipantsCompleted,
  getParticipantsCompletedByLocation,
  getParticipantsExpired,
  destroyParticipantExpired,
  approveParticipant,
  podiumFastest,
  getProvinces,
  getCities,
  getPodiumFinisher,
  getPodiumFinisherExcel,
  getActivities,
  getActivityDetails,
};
