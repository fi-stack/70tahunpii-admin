const stateActivities = {
  activities: [],
};

const stateActivityDetails = {
  activity_details: [],
};

const activities = (state = stateActivities, action) => {
  if (action.type === "GET_ACTIVITIES") {
    return {
      ...state,
      activities: action.payload,
    };
  }

  return state;
};

const activityDetails = (state = stateActivityDetails, action) => {
  if (action.type === "GET_ACTIVITY_DETAILS") {
    return {
      ...state,
      activity_details: action.payload,
    };
  }

  return state;
};

export { activities, activityDetails };
