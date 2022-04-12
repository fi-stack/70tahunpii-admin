import Api from "../../../api/Api";

const storeRegister = (form) => {
  return new Promise((resolve, reject) => {
    Api.post("/register", form)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const storeLogin = (form) => {
  return new Promise((resolve, reject) => {
    Api.post("/login", form)
      .then((res) => {
        resolve(res.data);
        localStorage.setItem("admin-token", res.data.data.token);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getAdmin = () => (dispatch) => {
  const adminToken = localStorage.getItem("admin-token");
  Api.get("/get-admin", {
    headers: {
      Authorization: `bearer ${adminToken}`,
    },
  })
    .then((res) => {
      dispatch({ type: "GET_ADMIN", payload: res.data.data });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export { storeRegister, storeLogin, getAdmin };
