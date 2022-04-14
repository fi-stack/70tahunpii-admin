import Api from "../../../api/Api";

const getParticipants = () => (dispatch) => {
  Api.get(`/participants`)
    .then((res) => {
      dispatch({ type: "GET_PARTICIPANTS", payload: res.data.data });
    })
    .catch((err) => console.log(err.response));
};

const approveParticipant = (id) => {
  return new Promise((resolve, reject) => {
    Api.post(`/participants/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export { getParticipants, approveParticipant };
