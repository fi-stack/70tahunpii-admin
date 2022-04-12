import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost/70tahunpii-service/public/api/v1",
});

export default Api;
