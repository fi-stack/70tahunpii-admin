const stateParticipantDetails = {
  participant_details: {},
};

const participantDetails = (state = stateParticipantDetails, action) => {
  if (action.type === "GET_PARTICIPANT_DETAILS") {
    return {
      ...state,
      participant_details: action.payload,
    };
  }

  return state;
};

export { participantDetails };
