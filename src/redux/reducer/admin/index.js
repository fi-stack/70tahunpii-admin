const stateAdmin = {
  admin: {},
};

const admin = (state = stateAdmin, action) => {
  if (action.type === "GET_ADMIN") {
    return {
      ...state,
      admin: action.payload,
    };
  }

  return state;
};

export { admin };
