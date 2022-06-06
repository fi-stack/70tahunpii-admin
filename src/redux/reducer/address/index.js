const stateProvinces = {
  provinces: [],
};

const stateCities = {
  cities: [],
};

const provinces = (state = stateProvinces, action) => {
  if (action.type === "GET_PROVINCES") {
    return {
      ...state,
      provinces: action.payload,
    };
  }

  return state;
};

const cities = (state = stateCities, action) => {
  if (action.type === "GET_CITIES") {
    return {
      ...state,
      cities: action.payload,
    };
  }

  return state;
};

export { provinces, cities };
