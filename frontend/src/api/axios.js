import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // your backend base
  withCredentials: true, // VERY IMPORTANT for cookies
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(err);
  },
);

export default API;
