const stateParticipants = {
  participants: [],
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

export { participants };
