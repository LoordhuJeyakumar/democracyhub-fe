import axios from "axios";


let isDeployed = true;
const baseURL = isDeployed
  ? "https://democracyhub-be.onrender.com/api/v1/"
  : `http://localhost:3333/api/v1/`;

const authInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const formDataInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const protectedInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


protectedInstance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


export default { authInstance, protectedInstance, baseURL };
