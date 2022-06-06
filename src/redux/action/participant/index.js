import Api from "../../../api/Api";

const getParticipants =
  (type, verified, search = "", page = "") =>
  (dispatch) => {
    console.log(page);
    Api.get(
      `/participants?type=${type}&verified=${verified}&search=${search}&page=${page}`
    )
      .then((res) => {
        dispatch({ type: "GET_PARTICIPANTS", payload: res.data.data });
      })
      .catch((err) => console.log(err.response));
  };

const getParticipantsCompleted =
  (type, page = "") =>
  (dispatch) => {
    Api.get(`/participants/completed/${type}?page=${page}`)
      .then((res) => {
        dispatch({
          type: "GET_PARTICIPANTS_COMPLETED",
          payload: res.data.data,
        });
      })
      .catch((err) => console.log(err.response));
  };

const exportParticipantsCompleted = (type) => (dispatch) => {
  Api.get(`/participants/completed/${type}/excel`, { responseType: "blob" })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${new Date().toLocaleDateString()} ${type}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => console.log(err.response));
};

const exportPaymentRecap = () => (dispatch) => {
  Api.get(`/participants/payment-recap/excel`, { responseType: "blob" })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${new Date().toLocaleDateString()} Payment Recap.xlsx`
      );
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => console.log(err.response));
};

const exportNotYetPaid = () => (dispatch) => {
  Api.get(`/participants/not-yet-paid/excel`, { responseType: "blob" })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${new Date().toLocaleDateString()} Not Yet Paid.xlsx`
      );
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => console.log(err.response));
};

const podiumFastest = (type, sex, age) => (dispatch) => {
  Api.get(`/podium/fastest/excel?type=${type}&sex=${sex}&age=${age}`, {
    responseType: "blob",
  })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${new Date().toLocaleDateString()} Podium Fastest ${type} ${sex} ${age}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => console.log(err.response));
};

const getPodiumFinisherExcel = (type) => (dispatch) => {
  Api.get(`/podium/finisher/${type}/excel`, {
    responseType: "blob",
  })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${new Date().toLocaleDateString()} Podium Finisher ${type}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => console.log(err.response));
};

const getPodiumFinisher = (type) => (dispatch) => {
  Api.get(`/podium/finisher/${type}`).then((res) => {
    dispatch({ type: "GET_PODIUM_FINISHER", payload: res.data.data });
  });
};

const getParticipantsCompletedByLocation =
  (type, category, province) => (dispatch) => {
    Api.get(
      `/participants/completed/${type}/category/${category}/province/${province}`
    ).then((res) => {
      dispatch({
        type: "GET_PARTICIPANTS_COMPLETED_BY_LOCATION",
        payload: res.data.data,
      });
    });
  };

const exportParticipantsCompletedByLocation =
  (type, category, province) => (dispatch) => {
    Api.get(
      `/participants/completed/${type}/category/${category}/province/${province}/excel`,
      { responseType: "blob" }
    )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${new Date().toLocaleDateString()} ${type} ${province}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log(err.response));
  };

const getParticipantsExpired = () => (dispatch) => {
  Api.get(`/participants/expired`)
    .then((res) => {
      dispatch({ type: "GET_PARTICIPANTS_EXPIRED", payload: res.data.data });
    })
    .catch((err) => console.log(err.response));
};

const destroyParticipantExpired = (id) => {
  return new Promise((resolve, reject) => {
    Api.post(`/participants/expired/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const approveParticipant = (id, adminId) => {
  return new Promise((resolve, reject) => {
    Api.post(`/participants/${id}/admin/${adminId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export {
  getParticipants,
  getParticipantsCompleted,
  exportParticipantsCompleted,
  exportPaymentRecap,
  exportNotYetPaid,
  getParticipantsCompletedByLocation,
  exportParticipantsCompletedByLocation,
  getParticipantsExpired,
  destroyParticipantExpired,
  approveParticipant,
  podiumFastest,
  getPodiumFinisher,
  getPodiumFinisherExcel,
};
