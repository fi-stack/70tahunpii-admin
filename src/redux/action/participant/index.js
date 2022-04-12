import Api from "../../../api/Api";

const getParticipantDetails =
  (search = "") =>
  (dispatch) => {
    Api.get(`/participant-details?search=${search}`)
      .then((res) => {
        dispatch({
          type: "GET_PARTICIPANT_DETAILS",
          payload: res.data.data,
        });
      })
      .catch((err) => console.log(err.response));
  };

export { getParticipantDetails };
