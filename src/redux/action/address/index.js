import Api from "../../../api/Api";

const getProvinces = () => (dispatch) => {
  Api.get("/provinces")
    .then((res) => {
      dispatch({ type: "GET_PROVINCES", payload: res.data.data });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const getCities = (id) => (dispatch) => {
  Api.get(`/cities?province_code=${id}`)
    .then((res) => {
      dispatch({ type: "GET_CITIES", payload: res.data.data });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export { getProvinces, getCities };
