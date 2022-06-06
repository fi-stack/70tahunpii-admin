import Api from "../../../api/Api";

const getActivities =
  (type, search = "") =>
  (dispatch) => {
    Api.get(`/activities?type=${type}&search=${search}`)
      .then((res) => {
        dispatch({ type: "GET_ACTIVITIES", payload: res.data.data });
      })
      .catch((err) => console.log(err.response));
  };

const getActivityDetails =
  (type, athleteId, search = "") =>
  (dispatch) => {
    Api.get(`/activities/${type}/${athleteId}/detail?search=${search}`)
      .then((res) => {
        dispatch({ type: "GET_ACTIVITY_DETAILS", payload: res.data.data });
      })
      .catch((err) => console.log(err.response));
  };

const validationActivity = (id, form) => {
  return new Promise((resolve, reject) => {
    Api.post(`/activities/manual-validation/${id}`, form)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export { getActivities, getActivityDetails, validationActivity };
