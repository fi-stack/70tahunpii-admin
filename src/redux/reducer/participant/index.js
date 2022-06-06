const stateParticipants = {
  participants: {},
};

const stateParticipantsCompleted = {
  participants_completed: {},
};

const stateParticipantsCompletedByLocation = {
  participants_completed_by_location: {},
};

const stateParticipantsExpired = {
  participants_expired: [],
};

const statePodiumFinisher = {
  podium_finisher: [],
};

const participants = (state = stateParticipants, action) => {
  if (action.type === "GET_PARTICIPANTS") {
    return {
      ...state,
      participants: action.payload,
    };
  }

  return state;
};

const participantsCompleted = (state = stateParticipantsCompleted, action) => {
  if (action.type === "GET_PARTICIPANTS_COMPLETED") {
    return {
      ...state,
      participants_completed: action.payload,
    };
  }

  return state;
};

const participantsCompletedByLocation = (
  state = stateParticipantsCompletedByLocation,
  action
) => {
  if (action.type === "GET_PARTICIPANTS_COMPLETED_BY_LOCATION") {
    return {
      ...state,
      participants_completed_by_location: action.payload,
    };
  }

  return state;
};

const participantsExpired = (state = stateParticipantsExpired, action) => {
  if (action.type === "GET_PARTICIPANTS_EXPIRED") {
    return {
      ...state,
      participants_expired: action.payload,
    };
  }

  return state;
};

const podiumFinisher = (state = statePodiumFinisher, action) => {
  if (action.type === "GET_PODIUM_FINISHER") {
    return {
      ...state,
      podium_finisher: action.payload,
    };
  }

  return state;
};

export {
  participants,
  participantsCompleted,
  participantsCompletedByLocation,
  participantsExpired,
  podiumFinisher,
};
