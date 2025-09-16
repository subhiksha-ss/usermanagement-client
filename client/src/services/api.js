import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", 
});

API.interceptors.request.use(config => { // config - object => methid request header url
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
